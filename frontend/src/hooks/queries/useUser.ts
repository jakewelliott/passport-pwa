import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { userProfile } from '@/lib/mock/user';
import { dbg, jason } from '@/lib/debug';
import { API_USER_URL, fetchGet } from '@/lib/fetch';

// Create a Zustand store for user data
interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

const useUserStore = create<UserState>()(
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
	const isLoggedIn = !!user;

  const query = useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Replace this with your actual API call
				dbg('QUERY', 'useUser');
        const response = await fetchGet(API_USER_URL);
        const userData = await response.json();
        setUser(userData); // Update Zustand store
        dbg('QUERY', 'useUser', userData.username);
        return userData;
      } catch (error) {
        dbg('ERROR', 'useUser', error);
        return null;
      }
    },
    staleTime: Infinity, // Prevent refetching unless explicitly invalidated
  });

	dbg('QUERY', 'useUser', query.data?.username || 'no user');
	return { ...query, isLoggedIn };
};
