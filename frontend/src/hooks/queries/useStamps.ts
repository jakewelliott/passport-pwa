import { dbg } from '@/lib/debug';
import { API_COLLECTED_STAMPS_URL, API_STAMPS_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { CollectStampRequest } from '@/lib/mock/types';
import type { CollectedStamp } from '@/lib/mock/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useUser } from './useUser';
/**
 * Gets all of the local user's stamps, empty array if user is not loaded
 * @returns The stamps for the user
 */
export const useStamps = () => {
  const { data: user } = useUser();
  const { data, isLoading, refetch } = useQuery<CollectedStamp[]>({
    queryKey: ['stamps', user?.id],
    queryFn: async () => await fetchGet(API_COLLECTED_STAMPS_URL),
  });
  dbg('HOOK', 'useStamps', { data, isLoading });
  return { data, isLoading, refetch };
};

/**
 * Gets a single stamp for a user, null if stamp not collected yet
 * @param code The code of the park to get the stamp for
 * @returns The stamp for the user
 */
export const useStamp = (abbreviation: string) => {
  // re-use our query hooks whenever possible
  const { data, isLoading } = useStamps();
  return { data: data?.find((stamp) => stamp.parkAbbreviation === abbreviation) || null, isLoading };
};

export const useCollectStamp = (parkAbbreviation: string) => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, CollectStampRequest>({
    mutationFn: async ({ latitude, longitude, inaccuracyRadius, method, dateTime }) => {
      dbg('MUTATE', 'Collecting stamp', { latitude, longitude, inaccuracyRadius, method, dateTime });
      const response = await fetchPost(`${API_STAMPS_URL}/${parkAbbreviation}`, {
        latitude,
        longitude,
        inaccuracyRadius,
        method,
        dateTime,
      });
      return await response.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stamps'] });
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
