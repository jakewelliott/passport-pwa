import { dbg } from '@/lib/debug';
import type { BucketListActivity, BucketListCompletion, BucketListItem } from '@/lib/mock/types';
import { toast } from 'react-toastify';
// import { API_BUCKET_LIST_URL, fetchGet } from '@/lib/fetch';

// @ts-ignore: remove me after uncommenting
const useBucketListItems = (parkId: number) => {
  // return useQuery<BucketListActivity[]>({
  //   queryKey: ['bucketList', parkId],
  //   queryFn: () => fetchGet(`${API_BUCKET_LIST_URL}/${parkId}`),
  // });

  const mockData: BucketListActivity[] = [
    {
      id: 1,
      parkId: 1,
      task: 'Visit the park',
    },
    {
      id: 2,
      parkId: 1,
      task: 'Visit the park again',
    },
  ];

  return {
    data: mockData,
    isLoading: false,
    isError: false,
  };
};

// i suck at naming stuff
// @ts-ignore: remove me after uncommenting
const useCompletedBucketList = (parkId: number) => {
  // return useQuery<BucketListCompletion[]>({
  //   queryKey: ['completedBucketList', parkId],
  //   queryFn: () => fetchGet(`${API_BUCKET_LIST_COMPLETED_URL}/${parkId}`),
  // });

  const mockData: BucketListCompletion[] = [
    {
      id: 1,
      userId: 1337,
      completedAt: new Date(),
      deleted: false,
    },
    {
      id: 2,
      userId: 1337,
      completedAt: new Date(),
      deleted: false,
    },
  ];

  return {
    data: mockData,
    isLoading: false,
    isError: false,
  };
};

const useBucketListMutation = () => {
  // TODO: implement this with useMutation
  // @ts-ignore: shut up!
  const toggleCompletion = (activityId: number) => {
    dbg('MUTATE', 'useBucketListMutation', 'not implemented');
    toast.info('Not implemented');
  };

  return { toggleCompletion };
};

export const useBucketList = (parkId: number) => {
  const { data: activities, isLoading: activitiesLoading } = useBucketListItems(parkId);
  const { data: completions, isLoading: completionsLoading } = useCompletedBucketList(parkId);
  const { toggleCompletion } = useBucketListMutation();

  const isLoading = activitiesLoading || completionsLoading;

  if (isLoading) {
    return {
      isLoading,
      data: [],
      // @ts-ignore: should be callable but always be noop
      toggleCompletion: (activityId: number) => {},
    };
  }

  // D.R.Y. :P
  const findCompletion = (activityId: number) => completions.find((c) => c.id === activityId && !c.deleted);

  // Combine the bucket list activities with their completion status for the current user
  const bucketListItems: BucketListItem[] = activities.map((activity) => {
    const completion = findCompletion(activity.id);
    return completion
      ? {
          ...activity,
          completionId: completion.id,
          completedAt: completion.completedAt,
          deleted: completion.deleted,
        }
      : activity;
  });

  return {
    isLoading,
    data: bucketListItems,
    toggleCompletion,
  };
};
