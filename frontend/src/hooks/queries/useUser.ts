import { dbg } from '@/lib/debug';
import { API_AUTH_URL, fetchGet } from '@/lib/fetch';
import type { UserProfile } from '@/types';
import { useQuery } from '@tanstack/react-query';

// React Query hook for fetching user data
export const useUser = () => {
    // TODO: this endpoint doesn't actually exist, we should make it to return the user's data
    const query = useQuery<UserProfile | null, Error>({
        queryKey: ['user'],
        queryFn: async () => await fetchGet(API_AUTH_URL),
        staleTime: Infinity, // Prevent refetching unless explicitly invalidated
    });

    const user = query.data;
    const isLoggedIn = !!user;
    const isAdmin = isLoggedIn && user?.role === 'admin';

    dbg('HOOK', 'useUser', user?.username ?? 'no user');
    return { ...query, isLoggedIn, isAdmin };
};
