import type { Park, ParkActivity } from '@/lib/mock/types';
import { FaRegCheckSquare, FaRegSquare, FaStamp } from 'react-icons/fa';

interface AchievementsViewProps {
  parkActivity: ParkActivity;
  park: Park;
}

const AchievementsView = ({ parkActivity, park }: AchievementsViewProps) => {
  return (
    <div className='flex flex-col gap-3' data-testid='achievements-view'>
      {parkActivity.stampCollectedAt !== undefined && (
        <div className='top-0 flex'>
          <FaStamp size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          <p>
            {parkActivity.stampCollectedAt
              ? `Stamp collected ${parkActivity.stampCollectedAt}`
              : 'Stamp not yet collected'}
          </p>
        </div>
      )}
      {
        park.bucketListItems &&
        park.bucketListItems.length > 0 && (
          <div className='top-0 flex'>
            {parkActivity.completedBucketListItems[0]?.id ? (
              <FaRegCheckSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
            ) : (
              <FaRegSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
            )}
            <p data-testid={'BLI'}>
              Bucket List Item:
              <br />
              {park.bucketListItems[0].task}
            </p>
          </div>
        )}
    </div>
  );
};

export default AchievementsView;
