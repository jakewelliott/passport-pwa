import { API_ACTIVITY_URL, API_PARKGEO_URL, API_PARKS_URL, fetchGet } from '@/lib/fetch';
import type { Park, ParkActivity, ParkGeoData } from '@/lib/mock/types';
import { useQuery } from '@tanstack/react-query';

// ADAM:
// This is a very simple query hook.
// It's a good starting point for most queries.
// It's a good idea to have a query hook for each endpoint.

// useQuery returns an object with some useful properties:
// - data: the data returned from the query
// - isLoading: a boolean that indicates if the query is loading (data is undefined)
// - isError: a boolean that indicates if the query has an error
// - error: the error returned from the query

export const usePark = (abbreviation: string) => {
  return useQuery<Park>({
    queryKey: ['park', abbreviation],
    queryFn: async () => await fetchGet(`${API_PARKS_URL}/${abbreviation}`),
  });
};

export const useParkActivity = (parkId: number) => {
  return useQuery<ParkActivity>({
    queryKey: ['parkActivity', parkId],
    queryFn: async () => await fetchGet(`${API_ACTIVITY_URL}/${parkId}`),
  });
};

export const useParks = () => {
  return useQuery<Park[]>({
    queryKey: ['parks'],
    queryFn: async () => await fetchGet(API_PARKS_URL),
  });
};

export const useParksGeo = () => {
  return useQuery<ParkGeoData[]>({
    queryKey: ['parkGeo'],
    queryFn: async () => await fetchGet(API_PARKGEO_URL),
  });
};
