import type { ParkAbbreviation } from '@/lib/mock/types';
import { useUser } from './queries/useUser';
import { api } from '@/lib/mock/api';
import { useQuery } from '@tanstack/react-query';
import { USER_LOADING_ID } from './queries/useUser';
/**
 * Gets all of the local user's stamps, empty array if user is not loaded
 * @returns The stamps for the user
 */
export const useStamps = () => {
  // re-use our query hooks whenever possible
  const { data: user } = useUser();
  // to respect rules of hooks we must always call this query hook, hence the USER_LOADING_ID
  return useQuery({
    queryKey: ['stamps', user?.id || USER_LOADING_ID],
    queryFn: () => api.getUserStampsByID(user?.id || USER_LOADING_ID),
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
