import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '@/pages/ErrorComponent';
import Loader from '@/pages/Loader';
import axios from 'axios';

const UnverifiedProperties = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['Unverified-Hostels-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/hostels/count-unverified-hostels', {
        withCredentials: true,
      });
      return response.data;
    },
  });
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery({
    queryKey: ['Unverified-PGs-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/pgs/count-unverified-pgs', {
        withCredentials: true,
      });
      return response.data;
    },
  });
  const {
    data: data3,
    isLoading: isLoading3,
    isError: isError3,
  } = useQuery({
    queryKey: ['Unverified-Flats-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/flats/count-unverified-flats', {
        withCredentials: true,
      });
      return response.data;
    },
  });
  if (isLoading || isLoading2 || isLoading3) return <Loader />;
  if (isError || isError2 || isError3) return <ErrorComponent />;
  return {
    hostel: data.data || 0,
    pg: data2.data || 0,
    flat: data3.data || 0,
  };
};

export default UnverifiedProperties;
