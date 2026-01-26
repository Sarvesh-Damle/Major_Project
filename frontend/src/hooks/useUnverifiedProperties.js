import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * Custom hook to fetch unverified property counts
 * @returns {{ hostel: number, pg: number, flat: number, isLoading: boolean, isError: boolean }}
 */
const useUnverifiedProperties = () => {
  const {
    data: hostelData,
    isLoading: isLoadingHostel,
    isError: isErrorHostel,
  } = useQuery({
    queryKey: ['Unverified-Hostels-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/hostels/count-unverified-hostels', {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: pgData,
    isLoading: isLoadingPG,
    isError: isErrorPG,
  } = useQuery({
    queryKey: ['Unverified-PGs-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/pgs/count-unverified-pgs', {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: flatData,
    isLoading: isLoadingFlat,
    isError: isErrorFlat,
  } = useQuery({
    queryKey: ['Unverified-Flats-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/flats/count-unverified-flats', {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    hostel: hostelData?.data || 0,
    pg: pgData?.data || 0,
    flat: flatData?.data || 0,
    isLoading: isLoadingHostel || isLoadingPG || isLoadingFlat,
    isError: isErrorHostel || isErrorPG || isErrorFlat,
  };
};

export default useUnverifiedProperties;
