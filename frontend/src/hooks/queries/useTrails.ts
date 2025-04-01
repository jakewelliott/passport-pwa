import { API_TRAILS_URL, fetchGet } from '@/lib/fetch';
import type { Trail } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useTrails = () => {
    return useQuery<Trail[]>({
        queryKey: ['trails'],
        queryFn: async () => await fetchGet(API_TRAILS_URL),
    });
};
