import { useQuery } from '@tanstack/react-query';
import type { Park, ParkAbbreviation } from '@/lib/mock/types';
import { api } from '@/lib/mock/api';

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
    queryFn: (): Park[] => api.getParks(),
  });
};

export const usePark = (code: ParkAbbreviation) => {
  return useQuery<Park>({
    queryKey: ['park', code],
    queryFn: (): Park => api.getPark(code),
    enabled: !!code,
  });
};
