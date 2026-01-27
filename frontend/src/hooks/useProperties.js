import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePropertiesHostels = (city, filters = {}) => {
  const { locality, typeOfHostel, roomType, minPrice, maxPrice, sortBy, page, limit } = filters;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['Hostel_Properties', { city, ...filters }],
    queryFn: async () => {
      const params = { city };
      if (locality) params.locality = locality;
      if (typeOfHostel?.length) params.typeOfHostel = typeOfHostel;
      if (roomType?.length) params.roomType = roomType;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortBy) params.sortBy = sortBy;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const response = await axios.get('/api/v1/hostels/find-all-hostels', {
        withCredentials: true,
        params,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!city,
  });
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

const usePropertiesPGs = (city, filters = {}) => {
  const { locality, preferredTennats, roomType, minPrice, maxPrice, sortBy, page, limit } = filters;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['PG_Properties', { city, ...filters }],
    queryFn: async () => {
      const params = { city };
      if (locality) params.locality = locality;
      if (preferredTennats?.length) params.preferredTennats = preferredTennats;
      if (roomType?.length) params.roomType = roomType;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortBy) params.sortBy = sortBy;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const response = await axios.get('/api/v1/pgs/find-all-pgs', {
        withCredentials: true,
        params,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!city,
  });
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

const usePropertiesFlats = (city, filters = {}) => {
  const { locality, flatType, furnishedStatus, minPrice, maxPrice, sortBy, page, limit } = filters;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['Flat_Properties', { city, ...filters }],
    queryFn: async () => {
      const params = { city };
      if (locality) params.locality = locality;
      if (flatType?.length) params.flatType = flatType;
      if (furnishedStatus?.length) params.furnishedStatus = furnishedStatus;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortBy) params.sortBy = sortBy;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const response = await axios.get('/api/v1/flats/find-all-flats', {
        withCredentials: true,
        params,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!city,
  });
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export { usePropertiesHostels, usePropertiesPGs, usePropertiesFlats };
