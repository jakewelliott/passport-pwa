import { useParks } from '@/hooks/queries/useParks';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import DateHelper from '@/lib/date-helper';
import { useLocation } from '@/hooks/useLocation';
import { useUpdateBucketListItem } from '@/hooks/queries/useBucketList';
import { CompletedBucketListItem, BucketListItemInterface } from '@/lib/mock/types';

interface BucketListItemProps {
  bucketListItem: BucketListItemInterface;
  completedItems: CompletedBucketListItem[];
}

export const BucketListItem = ({ bucketListItem, completedItems }: BucketListItemProps) => {
  const isCompleted = completedItems.some(item => item.id === bucketListItem.id);
  const { data: parks } = useParks();
  const park = parks?.find(park => park.id === bucketListItem.park);
  const useUpdateBucketListItemMutation = useUpdateBucketListItem();
  const userLocation = useLocation();

  function updateBucketListItem(id: number, status: string): void {
    const useUpdateBucketListItemMutation = useUpdateBucketListItem(id);
    useUpdateBucketListItemMutation.mutate({
      latitude: userLocation.geopoint?.latitude ?? 0, 
      longitude: userLocation.geopoint?.longitude ?? 0, 
      status: status, 
      updatedAt: new Date()
    }, {
      onSuccess: () => {
        if (status === 'completed') {
          completedItems.push({
            id: bucketListItem.id,
            park: bucketListItem.park,
            updatedAt: DateHelper.stringify(new Date())
          });
        } else {
          completedItems = completedItems.filter(item => item.id !== bucketListItem.id);
        }
      }
    });
  }

  return (
    <div className='my-2.5 flex items-start'>
      {isCompleted ? (
        <FaRegCheckSquare
          data-testid='checked-icon'
          size={'24px'}
          strokeWidth={3}
          style={{ paddingRight: '5px', paddingTop: '3px' }}
          onClick={() => updateBucketListItem(bucketListItem.id, 'not completed')}
        />
      ) : (
        <FaRegSquare
          data-testid='unchecked-icon'
          size={'24px'}
          strokeWidth={3}
          style={{ paddingRight: '5px', paddingTop: '3px' }}
          onClick={() => updateBucketListItem(bucketListItem.id, 'completed')}
        />
      )}
      <div className='flex w-full flex-col justify-center'>
        <p>{bucketListItem.task}</p>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <p className='p-mini text-main_green'>{park?.addresses[0].city ?? ''}</p>
          {isCompleted && (
            <p className='p-mini'>{DateHelper.toStringShort(new Date(completedItems.find(item => item.id === bucketListItem.id)?.updatedAt ?? ''))}</p>
          )}
        </div>
      </div>
    </div>
  );
};
