import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * Custom hook to check authentication status and user role
 * @returns {{ user: object | null, isLoading: boolean, isError: boolean, isAdmin: boolean }}
 */
const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users/me', {
        withCredentials: true,
      });
      return response.data;
    },
    retry: false, // Don't retry on 401
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const user = data?.data || null;
  const isAdmin = user?.isAdmin === true;

  return {
    user,
    isLoading,
    isError,
    isAdmin,
    isAuthenticated: !!user,
  };
};

export default useAuth;
