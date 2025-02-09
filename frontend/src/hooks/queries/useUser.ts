import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { queryClient } from '@/lib/tanstack-local-storage';

export const useUser = () => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: () => {
      const cachedUser = queryClient.getQueryData<any>(['user']);
      if (!cachedUser) {
        throw new Error('No user is logged in');
      }
      return cachedUser;
    },
    enabled: !!queryClient.getQueryData(['user']),
    staleTime: Infinity, // Prevent refetching unless explicitly invalidated
  });
};
