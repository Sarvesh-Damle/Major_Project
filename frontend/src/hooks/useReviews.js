import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/reviews';

export const usePropertyReviews = (propertyId, propertyType, options = {}) => {
  const { page = 1, limit = 5 } = options;

  return useQuery({
    queryKey: ['reviews', propertyId, propertyType, page, limit],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/property`, {
        params: { propertyId, propertyType, page, limit },
        withCredentials: true,
      });
      return response.data.data;
    },
    enabled: !!propertyId && !!propertyType,
    staleTime: 1000 * 60 * 2,
  });
};

export const useUserReviews = () => {
  return useQuery({
    queryKey: ['reviews', 'user'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/user`, {
        withCredentials: true,
      });
      return response.data.data;
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId, propertyType, rating, comment }) => {
      const response = await axios.post(
        API_BASE,
        { propertyId, propertyType, rating, comment },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.propertyId, variables.propertyType],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', 'user'],
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, rating, comment }) => {
      const response = await axios.put(
        `${API_BASE}/${reviewId}`,
        { rating, comment },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId) => {
      const response = await axios.delete(`${API_BASE}/${reviewId}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
