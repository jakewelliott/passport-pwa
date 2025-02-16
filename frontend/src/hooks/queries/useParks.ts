import { useQuery } from '@tanstack/react-query';
import type { Park, ParkAbbreviation, ParkActivity } from '@/lib/mock/types';
import Cookies from 'js-cookie';
// import { api } from '@/lib/mock/api';

// ADAM:
// This is a very simple query hook.
// It's a good starting point for most queries.
// It's a good idea to have a query hook for each endpoint.

// useQuery returns an object with some useful properties:
// - data: the data returned from the query
// - isLoading: a boolean that indicates if the query is loading (data is undefined)
// - isError: a boolean that indicates if the query has an error
// - error: the error returned from the query
const BASE_URL = `http://localhost:${process.env.PROD === 'PROD' ? process.env.NGINX_PORT : process.env.API_DEV_PORT}/api`;

const fetchPark = async (code: ParkAbbreviation): Promise<Park> => {
  const response = await fetch(`${BASE_URL}/locations/${code}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return { ...data, abbreviation: code };
};

const fetchParkActivity = async (parkId: number): Promise<ParkActivity> => {
  const token = Cookies.get('token');
  const response = await fetch(`${BASE_URL}/activity/park/${parkId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const usePark = (code: ParkAbbreviation) => {
  return useQuery<Park>({
    queryKey: ['park', code],
    queryFn: () => fetchPark(code),
  });
};

export const useParkActivity = (parkId: number) => {
  const token = Cookies.get('token');

  return useQuery<ParkActivity, Error>({
    queryKey: ['parkActivity', parkId],
    queryFn: () => fetchParkActivity(parkId),
    enabled: !!token, // Only run the query if a token exists
    retry: (failureCount, error) => {
      // Don't retry on 401 errors
      if (error.message === 'Unauthorized: Please log in again') {
        return false;
      }
      return failureCount < 3;
    }
  });
};

const fetchParks = async (): Promise<Park[]> => {
  const response = await fetch(`${BASE_URL}/locations`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const useParks = () => {
  return useQuery<Park[]>({
    queryKey: ['parks'],
    queryFn: fetchParks,
  });
};
