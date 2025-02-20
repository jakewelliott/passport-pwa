import { dbg } from '@/lib/debug';
import { API_STAMPS_URL, fetchGet } from '@/lib/fetch';
import type { Stamp } from '@/lib/mock/types';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';
/**
 * Gets all of the local user's stamps, empty array if user is not loaded
 * @returns The stamps for the user
 */
export const useStamps = () => {
  // re-use our query hooks whenever possible
  const { data: user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ['stamps', user?.id],
    queryFn: () => fetchGet(`${API_STAMPS_URL}/${user?.id}`),
  });
  dbg('HOOK', 'useStamps', { data, isLoading });
  return { data, isLoading };
};

/**
 * Gets a single stamp for a user, null if stamp not collected yet
 * @param code The code of the park to get the stamp for
 * @returns The stamp for the user
 */
export const useStamp = (abbreviation: string) => {
  // re-use our query hooks whenever possible
  const { data, isLoading } = useStamps();
  return { data: data?.find((stamp: Stamp) => stamp.abbreviation === abbreviation) || null, isLoading };
};
