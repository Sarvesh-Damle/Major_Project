import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setData(res.data);
    } catch (err) {
      // Don't show error toast for aborted requests
      if (axios.isCancel(err) || err.name === 'AbortError') {
        return;
      }
      toast.error('Something went wrong');
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      // Cleanup: abort any in-flight request on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const reFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, reFetch };
};

export default useFetch;
