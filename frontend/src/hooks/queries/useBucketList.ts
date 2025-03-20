import { API_BUCKET_LIST_URL, API_COMPLETED_BUCKET_LIST_ITEMS_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
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

  return useMutation({
    mutationFn: (itemId: number) => fetchPost(`${API_BUCKET_LIST_URL}/${itemId}`, geopoint),
    onSuccess: () => refetch(),
  });
};

/** Call with parkId as undefined to get all bucket list items and completed items */
export const useBucketList = (parkId?: number) => {
  const { data: allItems, isLoading: isLoadingAllItems } = useBucketListItems();
  const { data: allCompletedItems, isLoading: isLoadingCompletedItems } = useCompletedBucketListItems();
  const { mutate: toggleCompletion, isPending: isMarkingAsComplete } = useToggleCompletion();

  const isLoading =
    isLoadingAllItems || isLoadingCompletedItems || isMarkingAsComplete || !allItems || !allCompletedItems;

  // filtering logic (useMemo?)
  const parkItems = allItems?.filter((item: BucketListItem) => item.parkId === parkId) ?? [];
  const parkItemsIds = parkItems?.map((item: BucketListItem) => item.id) ?? [];
  const parkCompletedItems =
    allCompletedItems?.filter((item: any) => parkItemsIds.includes(item.bucketListItemId)) ?? [];

  return {
    items: parkId === undefined ? allItems : parkItems,
    completed: parkId === undefined ? allCompletedItems : parkCompletedItems,
    toggleCompletion,
    isLoading,
  };
};
