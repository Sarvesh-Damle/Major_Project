import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const usePropertiesHostels = (city, locality) => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["Hostel_Properties", {city, locality}],
        queryFn: async () => {
            const response = await axios.get("/api/v1/hostels/find-all-hostels", {withCredentials: true, params: {city, locality}});
            return response.data;
        },
        config: {refetchOnWindowFocus: false}
});
  return {
    data, isError, isLoading, refetch
  }
}

const usePropertiesPGs = (city, locality) => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["PG_Properties", {city, locality}],
        queryFn: async () => {
            const response = await axios.get("/api/v1/pgs/find-all-pgs", {withCredentials: true, params: {city, locality}});
            return response.data;
        },
        config: {refetchOnWindowFocus: false}
});
  return {
    data, isError, isLoading, refetch
  }
}

const usePropertiesFlats = (city, locality) => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["Flat_Properties", {city, locality}],
        queryFn: async () => {
            const response = await axios.get("/api/v1/flats/find-all-flats", {withCredentials: true, params: {city, locality}});
            return response.data;
        },
        config: {refetchOnWindowFocus: false}
});
  return {
    data, isError, isLoading, refetch
  }
}

export {usePropertiesHostels, usePropertiesPGs, usePropertiesFlats}