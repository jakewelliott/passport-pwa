import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { userProfile } from '@/lib/mock/user';
import { dbg, jason } from '@/lib/debug';
import { API_USER_URL } from '@/lib/fetch';

// Create a Zustand store for user data
interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
    }
  )
);

// React Query hook for fetching user data
export const useUser = () => {
  const { user, setUser } = useUserStore();

  return useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Replace this with your actual API call
				dbg('QUERY', 'useUser');
        const response = await fetch(API_USER_URL);
				jason(response);
        const userData = await response.json();
        setUser(userData); // Update Zustand store
        dbg('QUERY', 'useUser', userData);
        return userData;
      } catch (error) {
        dbg('ERROR', 'useUser', error);
        return null;
      }
    },
    placeholderData: user || { ...userProfile, id: 0 }, // Use persisted user data as placeholder
    staleTime: Infinity, // Prevent refetching unless explicitly invalidated
  });
};
