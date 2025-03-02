import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParkActivity } from '@/hooks/queries/useParks';
import DateHelper from '@/lib/date-helper';
import type { Park } from '@/lib/mock/types';
import { FaStamp } from 'react-icons/fa';

interface AchievementsViewProps {
  park: Park;
}

const StampView = ({ date }: { date?: string }) => {
  const dateString =
    date !== undefined
      ? `Stamp collected on ${DateHelper.stringify(new Date(date)).replace(',', ' at')}`
      : 'Stamp not yet collected';

  return (
    <div className='my-2.5 flex items-start'>
      <FaStamp size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
      <div className='flex w-full flex-col justify-center'>
        <p>{dateString}</p>
      </div>
    </div>
  );
};

const AchievementsView = ({ park }: AchievementsViewProps) => {
  const { data: parkActivity, isLoading: isParkActivityLoading } = useParkActivity(park.id);
  const { items, completed, toggleCompletion, isLoading: isBucketListLoading } = useBucketList(park.id);

  if (isParkActivityLoading || isBucketListLoading || !parkActivity)
    return <LoadingPlaceholder what='your achievements' />;

  return (
    <div className='flex flex-col gap-3' data-testid='achievements-view'>
      <StampView date={parkActivity.stampCollectedAt} />
    </div>
  );
};

export default AchievementsView;
