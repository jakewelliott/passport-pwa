import { jason } from '@/lib/debug';
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
  return useQuery<BucketListCompletion>({
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

  const mockLocation = {
    latitude: 35.881595,
    longitude: -78.758285,
    inaccuracyRadius: 0.001,
  };

  return useMutation({
    mutationFn: (itemId: number) => {
      return fetchPost(`${API_BUCKET_LIST_URL}/${itemId}`, {
        latitude: 35.881595,
        longitude: -78.758285,
        inaccuracyRadius: 0.001,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });
};

/** Call with parkId as undefined to get all bucket list items and completed items */
export const useBucketList = (parkId?: number) => {
  const { data: allItems, isLoading: isLoadingAllItems } = useBucketListItems();
  const { data: allCompletedItems, isLoading: isLoadingCompletedItems } = useCompletedBucketListItems();
  const { mutate: toggleCompletion, isPending: isMarkingAsComplete } = useToggleCompletion();

  const isLoading =
    isLoadingAllItems || isLoadingCompletedItems || isMarkingAsComplete || !allItems || !allCompletedItems;

  jason({ allCompletedItems });

  // filtering logic
  const parkItems = allItems?.filter((item: BucketListItem) => item.parkId === parkId) ?? [];
  // turn this into a list of ids
  const parkItemsIds = parkItems?.map((item: BucketListItem) => item.id) ?? [];

  // I have no idea why the backend is responding this way
  const parkCompletedItems = allCompletedItems.filter((item: any) => parkItemsIds.includes(item.bucketListItemId));

  return {
    items: parkId === undefined ? allItems : parkItems,
    completed: parkId === undefined ? allCompletedItems : parkCompletedItems,
    toggleCompletion,
    isLoading,
  };
};
