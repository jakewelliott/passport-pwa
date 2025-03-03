import { fetchPost } from '@/lib/fetch';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation } from '../useLocation';
import { useUser } from './useUser';

/** Gets all bucket list items for all parks */
const useBucketListItems = () => {
  const mock: BucketListItem[] = [
    {
      id: 1,
      parkId: 1,
      task: 'Visit the park at night',
    },
    {
      id: 2,
      parkId: 1,
      task: 'Hike the Mock trail',
    },
  ];

  return useQuery({
    queryKey: ['bucketListItems'],
    queryFn: () => mock,
  });
};

/** Gets all completed bucket list items for a user */
const useCompletedBucketListItems = (userId: number) => {
  const mock: BucketListCompletion[] = [
    {
      userId: userId,
      itemId: 2,
      latitude: 7,
      longitude: 8,
      inaccuracyRadius: 0,
      updatedAt: new Date(),
      completed: true,
      deleted: false,
      parkId: 1,
      parkAbbreviation: 'MOCK',
      id: 0,
      createdAt: new Date(),
    },
  ];

  return useQuery({
    queryKey: ['completedBucketListItems'],
    queryFn: () => mock,
  });
};

/** Toggles the completion status of a bucket list item for a user
 *  Call mutate with the itemId to toggle the completion status
 */
const useToggleCompletion = (userId: number) => {
  const { data: completedItems, refetch } = useCompletedBucketListItems(userId);
  const { geopoint } = useLocation();

  // ADAM: not sure if this logic should be done on frontend or backend (b/c caching)
  // maybe toggling could just be a POST request to like /bucketlist/{parkId}/{itemId}
  const getToggledValue = (itemId: number): boolean => {
    const item = completedItems?.find((item) => item.itemId === itemId);
    const newStatus = item ? !item.completed : true; // set status to true if item doesn't exist yet
    return newStatus;
  };

  return useMutation({
    mutationFn: (itemId: number) => {
      return fetchPost(`${API_BUCKET_LIST_URL}/${itemId}`, {
        completed: getToggledValue(itemId),
      });
    },
  });
};

/** Call with parkId as undefined to get all bucket list items and completed items */
export const useBucketList = (parkId?: number) => {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const userId = user?.id ?? 0;

  const { data: allItems, isLoading: isLoadingAllItems } = useBucketListItems();
  const { data: allCompletedItems, isLoading: isLoadingCompletedItems } = useCompletedBucketListItems(userId);
  const { mutate: toggleCompletion, isPending: isMarkingAsComplete } = useToggleCompletion(userId);

  const isLoading = isLoadingAllItems || isLoadingCompletedItems || isMarkingAsComplete || isLoadingUser;

  // filtering logic
  const parkItems = allItems?.filter((item) => item.parkId === parkId);
  const parkCompletedItems = allCompletedItems?.filter((item) => item.itemId === parkId);

  return {
    items: parkId === undefined ? allItems : parkItems,
    completed: parkId === undefined ? allCompletedItems : parkCompletedItems,
    toggleCompletion,
    isLoading,
  };
};
