import type { Park, ParkActivity } from '@/lib/mock/types';
import { FaRegCheckSquare, FaRegSquare, FaStamp } from 'react-icons/fa';
import DateHelper from '@/lib/date-helper';
import { useUpdateBucketListItem } from '@/hooks/queries/useBucketList';
import { useLocation } from '@/hooks/useLocation';

interface AchievementsViewProps {
  parkActivity: ParkActivity;
  park: Park;
}

const AchievementsView = ({ parkActivity, park }: AchievementsViewProps) => {
  const useUpdateBucketListItemMutation = useUpdateBucketListItem();
  const userLocation = useLocation();

  function updateBucketListItem(id: number, status: string): void {
    const useUpdateBucketListItemMutation = useUpdateBucketListItem(id);
    useUpdateBucketListItemMutation.mutate({
      latitude: userLocation.geopoint?.latitude ?? 0, 
      longitude: userLocation.geopoint?.longitude ?? 0, 
      status: status, 
      updatedAt: new Date()
    });
  }

  return (
    <div className='flex flex-col gap-3' data-testid='achievements-view'>
      {parkActivity.stampCollectedAt !== undefined && (
        <div className='top-0 flex'>
          <FaStamp size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          <p>
            {parkActivity.stampCollectedAt
              ? `Stamp collected on ${DateHelper.stringify(new Date(parkActivity.stampCollectedAt)).replace(',', ' at')}`
              : 'Stamp not yet collected'}
          </p>
        </div>
      )}
      {
        park.bucketListItems &&
        park.bucketListItems.length > 0 && (
          <div className='flex flex-col gap-2'>
            {park.bucketListItems.map((item, index) => (
              <div key={index} className='top-0 flex'>
                {parkActivity.completedBucketListItems.some(completed => completed.id === item.id) ? (
                  <FaRegCheckSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} onClick={() => updateBucketListItem(item.id, 'not completed')} />
                ) : (
                  <FaRegSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} onClick={() => updateBucketListItem(item.id, 'completed')} />
                )}
                <p data-testid={'BLI'}>
                  Bucket List Item:
                  <br />
                  {item.task}
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default AchievementsView;
