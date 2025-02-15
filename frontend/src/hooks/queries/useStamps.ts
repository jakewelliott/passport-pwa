import type { ParkAbbreviation } from '@/lib/mock/types';
import { useUser } from './useUser';
import { api } from '@/lib/mock/api';
import { useQuery } from '@tanstack/react-query';
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
export const useStamp = (code: ParkAbbreviation) => {
  // re-use our query hooks whenever possible
  const { data, isLoading } = useStamps();
  return { data: data?.find((stamp) => stamp.code === code) || null, isLoading };
};
