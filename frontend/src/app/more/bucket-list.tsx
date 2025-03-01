import { BucketListItem } from '@/app/more/components/bucket-list-item';
import { useGetAllBucketListItems, useGetAllCompletedBucketListItems } from '@/hooks/queries/useBucketList';

export const BucketList = () => {
  const { data: bucketListItems } = useGetAllBucketListItems();
  const { data: completedBucketListItems } = useGetAllCompletedBucketListItems();

  return (
    <div className='p-7'>
      <div className='m-7 mx-auto max-w-96'>
        {bucketListItems?.map((item) => (
          <BucketListItem key={item.id} bucketListItem={item} completedItems={completedBucketListItems} />
        ))}
      </div>
    </div>
  );
};
