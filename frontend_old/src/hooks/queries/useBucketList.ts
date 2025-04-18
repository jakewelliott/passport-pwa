import { dbg } from '@/lib/debug';
import { API_BUCKET_LIST_URL, API_COMPLETED_BUCKET_LIST_ITEMS_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useLocation } from '../useLocation';

/** Gets all bucket list items for all parks */
// NOTE: only exported for testing, do not use in components!!
export const useBucketListItems = () => {
    return useQuery<BucketListItem[]>({
        queryKey: ['bucketListItems'],
        queryFn: () => fetchGet(API_BUCKET_LIST_URL),
    });
};

/** Gets all completed bucket list items for a user */
// NOTE: only exported for testing, do not use in components!!
export const useCompletedBucketListItems = () => {
    return useQuery<BucketListCompletion[]>({
        queryKey: ['completedBucketListItems'],
        queryFn: () => fetchGet(API_COMPLETED_BUCKET_LIST_ITEMS_URL),
    });
};

/** Toggles the completion status of a bucket list item for a user
 *  Call mutate with the itemId to toggle the completion status
 */
const useToggleCompletion = () => {
    const { refetch } = useCompletedBucketListItems();
    const { geopoint } = useLocation();

    const mutationFn = (itemId: number) => {
        dbg('MUTATE', 'toggleCompletion', { itemId, geopoint });
        if (geopoint === null) {
            toast.error('Location must be enabled to toggle completion');
        }
        return fetchPost(`${API_BUCKET_LIST_URL}/${itemId}`, { geopoint: geopoint });
    };

    return useMutation({
        mutationFn: mutationFn,
        onSuccess: () => refetch(),
    });
};

/** Call with parkId as undefined to get all bucket list items and completed items */
export const useBucketList = (parkId?: number) => {
    const { data: allItems, isLoading: isLoadingAllItems, isFetching: isFetchingAllItems } = useBucketListItems();
    const {
        data: allCompletedItems,
        isLoading: isLoadingCompletedItems,
        isFetching: isFetchingCompletedItems,
        refetch,
    } = useCompletedBucketListItems();
    const { mutate: toggleCompletion } = useToggleCompletion();

    const isFetching = isFetchingAllItems || isFetchingCompletedItems;
    const isLoading = isLoadingAllItems || isLoadingCompletedItems || !allItems || !allCompletedItems;

    // filtering logic (useMemo?)
    const parkItems = allItems?.filter((item: BucketListItem) => item.parkId === parkId) ?? [];
    const parkItemsIds = parkItems?.map((item: BucketListItem) => item.id) ?? [];
    const parkCompletedItems =
        allCompletedItems?.filter((item: any) => parkItemsIds.includes(item.bucketListItemId)) ?? [];

    return {
        data: parkId === undefined ? allItems : parkItems,
        completed: parkId === undefined ? allCompletedItems : parkCompletedItems,
        toggleCompletion,
        isLoading,
        isFetching,
        refetch,
    };
};
