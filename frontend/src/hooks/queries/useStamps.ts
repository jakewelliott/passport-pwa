import { api } from '@/lib/mock/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';
import { CollectStampRequest } from '@/lib/mock/types';
import { API_STAMPS_URL, fetchPost } from '@/lib/fetch';
import { dbg } from '@/lib/debug';
import { toast } from 'react-toastify';
/**
 * Gets all of the local user's stamps, empty array if user is not loaded
 * @returns The stamps for the user
 */
export const useStamps = () => {
  // re-use our query hooks whenever possible
  const { data: user } = useUser();
  return useQuery({
    queryKey: ['stamps', user?.id],
    queryFn: () => api.getUserStampsByID(user?.id || 0),
  });
};

/**
 * Gets a single stamp for a user, null if stamp not collected yet
 * @param code The code of the park to get the stamp for
 * @returns The stamp for the user
 */
export const useStamp = (code: string) => {
  // re-use our query hooks whenever possible
  const { data, isLoading } = useStamps();
  return { data: data?.find((stamp) => stamp.code === code) || null, isLoading };
};

export const useCollectStamp = (parkAbbreviation: string) => {
  return useMutation<string, Error, CollectStampRequest>({
    mutationFn: async ({ latitude, longitude, inaccuracyRadius, method, dateTime }) => {
      dbg('MUTATE', 'Collecting stamp', { latitude, longitude, inaccuracyRadius, method, dateTime });
      const response = await fetchPost(API_STAMPS_URL + '/' + parkAbbreviation, {
        latitude,
        longitude,
        inaccuracyRadius,
        method,
        dateTime,
      });
      return await response.text();
    },
    onSuccess: () => {
      useStamps().refetch();
      toast.success('Stamp collected!');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    },
  });
};