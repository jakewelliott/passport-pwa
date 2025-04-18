import { dbg } from '@/lib/debug';
import { API_FAVORITE_PARKS_URL, fetchDelete, fetchGet, fetchPost } from '@/lib/fetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/** Gets all favorited parks */
// NOTE: only exported for testing, do not use in components!!
export const useGetFavoriteParks = () => {
    return useQuery<number[]>({
        queryKey: ['favoritedParks'],
        queryFn: () => fetchGet(API_FAVORITE_PARKS_URL),
    });
};

/** Marks a park as a favorite park for a user
 *  Call mutate with the itemId to mark the park as a favorite
 */
const useMarkParkFavorite = () => {
    const { refetch, data } = useGetFavoriteParks();

    const mutationFn = (parkId: number) => {
        dbg('MUTATE', 'toggleFavorite', { itemId: parkId });
        refetch();
        if (data?.some((x) => x === parkId)) {
            toast.error('Park is already favorited');
        }
        return fetchPost(`${API_FAVORITE_PARKS_URL}/${parkId}`, '');
    };

    return useMutation({
        mutationFn: mutationFn,
        onSuccess: () => refetch(),
    });
};

/** Removes a park from favorited parks for a user
 *  Call mutate with the itemId to remove the park from favorites
 */
const useRemoveParkFavorite = () => {
    const { refetch, data } = useGetFavoriteParks();

    const mutationFn = (parkId: number) => {
        dbg('MUTATE', 'toggleFavorite', { itemId: parkId });
        refetch();
        if (!data?.some((x) => x === parkId)) {
            toast.error('Park is not a favorite');
        }
        return fetchDelete(`${API_FAVORITE_PARKS_URL}/${parkId}`);
    };

    return useMutation({
        mutationFn: mutationFn,
        onSuccess: () => refetch(),
    });
};

export const useFavoriteParks = () => {
    const { data: allItems, isLoading: isLoadingAllItems, isFetching, refetch } = useGetFavoriteParks();
    const { mutate: markFavorite } = useMarkParkFavorite();
    const { mutate: removeFavorite } = useRemoveParkFavorite();

    const isLoading = isLoadingAllItems || !allItems;

    return {
        data: allItems,
        markFavorite,
        removeFavorite,
        isLoading,
        isFetching,
        refetch,
    };
};
