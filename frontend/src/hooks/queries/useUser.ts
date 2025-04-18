import { dbg } from '@/lib/debug';
import { API_AUTH_URL, fetchGet } from '@/lib/fetch';
import type { UserProfile } from '@/types';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

// React Query hook for fetching user data
export const useUser = () => {
    dbg('HOOK', 'useUser');
    // TODO: this endpoint doesn't actually exist, we should make it to return the user's data
    const query = useQuery<UserProfile | null, Error>({
        queryKey: ['user'],
        queryFn: async () => await fetchGet(API_AUTH_URL),
        staleTime: Infinity,
    });

    const token = Cookies.get('token');
    const user = query.data;
    const isLoggedIn = !!token;
    const isAdmin = isLoggedIn && user?.role === 'admin';
    return { ...query, isLoggedIn, isAdmin };
};
