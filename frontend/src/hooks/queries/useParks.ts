import { API_PARKGEO_URL, API_PARKS_URL, fetchGet } from '@/lib/fetch';
import type { Park, ParkGeoData } from '@/types';
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

export const useParks = () => {
  return useQuery<Park[]>({
    queryKey: ['parks'],
    queryFn: async () => await fetchGet(API_PARKS_URL),
  });
};

export const usePark = (parkAbbreviation: string) => {
  const hook = useParks();
  const park = hook.data?.find((park) => park.abbreviation === parkAbbreviation);
  return { ...hook, data: park };
};

export const useParksGeo = () => {
  return useQuery<ParkGeoData[]>({
    queryKey: ['parkGeo'],
    queryFn: async () => await fetchGet(API_PARKGEO_URL),
  });
};
