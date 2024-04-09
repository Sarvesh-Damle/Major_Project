import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      toast.error("Something went wrong")
      setError(error);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, reFetch };
};

export default useFetch;
