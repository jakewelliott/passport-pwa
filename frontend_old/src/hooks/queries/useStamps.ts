import { dbg } from '@/lib/debug';
import { API_COLLECTED_STAMPS_URL, API_STAMPS_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { CollectStampRequest, CollectedStamp } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/**
 * Gets all of the local user's stamps, empty array if user is not loaded
 * @returns The stamps for the user
 */
export const useStamps = () => {
    dbg('HOOK', 'useStamps');
    const { data, isLoading, refetch } = useQuery<CollectedStamp[]>({
        queryKey: ['stamps'],
        queryFn: async () => await fetchGet(API_COLLECTED_STAMPS_URL),
    });
    return { data, isLoading, refetch };
};

/**
 * Gets a single stamp for a user, null if stamp not collected yet
 * @param code The code of the park to get the stamp for
 * @returns The stamp for the user
 */
export const useStamp = (parkId: number | undefined) => {
    // re-use our query hooks whenever possible
    dbg('HOOK', 'useStamp', parkId);
    const { data, ...hook } = useStamps();

    if (parkId === undefined) return { ...hook, data: undefined };
    const stamp = data?.find((stamp) => stamp.parkId === parkId);

    return { ...hook, data: stamp };
};

export const useStampMutation = () => {
    const { refetch } = useStamps();

    return useMutation<string, Error, CollectStampRequest>({
        mutationFn: async (stamp: CollectStampRequest) => {
            dbg('MUTATE', 'Collecting stamp', { stamp });
            const response = await fetchPost(`${API_STAMPS_URL}/${stamp.parkId}`, stamp);
            return await response.text();
        },
        onSuccess: () => {
            refetch();
            toast.success('Stamp collected!');
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        },
    });
};
