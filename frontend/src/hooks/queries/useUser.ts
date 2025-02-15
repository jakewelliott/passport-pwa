import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { queryClient } from '@/lib/tanstack-local-storage';
import { userProfile } from '@/lib/mock/user';

// use our mock user data as placeholder data for now.
const placeholderUser: UserProfile = { ...userProfile, id: 0 };

export const useUser = () => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: () => {
      // TODO: get user from the database, idk what this is lol
      const cachedUser = queryClient.getQueryData<UserProfile | null>(['user']);
      return cachedUser || null; // Return null if no cached data is found
    },
    placeholderData: placeholderUser, // Show mock data while loading
    staleTime: Infinity, // Prevent refetching unless explicitly invalidated
  });
};
