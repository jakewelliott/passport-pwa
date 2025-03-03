import { dbg } from '@/lib/debug';
import { API_BUCKET_LIST_URL, API_COMPLETED_BUCKET_LIST_ITEMS_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation } from '../useLocation';

/** Gets all bucket list items for all parks */
const useBucketListItems = () => {
  return useQuery({
    queryKey: ['bucketListItems'],
    queryFn: () => fetchGet(API_BUCKET_LIST_URL),
  });
};

/** Gets all completed bucket list items for a user */
const useCompletedBucketListItems = () => {
  return useQuery({
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

  dbg('MISC', 'utc', geopoint);

  return useMutation({
    mutationFn: async (itemId: number) => {
      const response = await fetchPost(`${API_BUCKET_LIST_URL}/${itemId}`, {
        latitude: geopoint?.latitude,
        longitude: geopoint?.longitude,
        inaccuracyRadius: geopoint?.accuracy,
      });
      refetch();
      return response;
    },
  });
};

/** Call with parkId as undefined to get all bucket list items and completed items */
export const useBucketList = (parkId?: number) => {
  const { data: allItems, isLoading: isLoadingAllItems } = useBucketListItems();
  const { data: allCompletedItems, isLoading: isLoadingCompletedItems } = useCompletedBucketListItems();
  const { mutate: toggleCompletion, isPending: isMarkingAsComplete } = useToggleCompletion();

  const isLoading = isLoadingAllItems || isLoadingCompletedItems || isMarkingAsComplete;

  // filtering logic
  const parkItems = allItems?.filter((item: BucketListItem) => item.parkId === parkId);
  const parkCompletedItems = allCompletedItems?.filter((item: BucketListCompletion) => item.itemId === parkId);

  return {
    items: parkId === undefined ? allItems : parkItems,
    completed: parkId === undefined ? allCompletedItems : parkCompletedItems,
    toggleCompletion,
    isLoading,
  };
};
