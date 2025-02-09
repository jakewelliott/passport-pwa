import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { queryClient } from '@/lib/tanstack-local-storage';

export const useUser = () => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: () => {
      const cachedUser = queryClient.getQueryData<UserProfile | null>(['user']);
      return cachedUser || null; // Return null if no user data is found
    },
    staleTime: Infinity, // Prevent refetching unless explicitly invalidated
  });
};
