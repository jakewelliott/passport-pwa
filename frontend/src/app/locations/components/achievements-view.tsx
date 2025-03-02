import { BucketList } from '@/components/bucket-list';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { StampCollectedOn } from '@/components/stamp-collected-on';
import { useParkActivity } from '@/hooks/queries/useParks';
import { dbg } from '@/lib/debug';
import type { Park } from '@/lib/mock/types';
import { FaStamp } from 'react-icons/fa';

interface AchievementsViewProps {
	park: Park;
}

const StampView = ({ date }: { date?: string }) => {
	return (
		<div className='my-2.5 flex items-start'>
			<FaStamp size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
			<div className='flex w-full flex-col justify-center'>
				<StampCollectedOn date={date} />
			</div>
		</div>
	);
};

const AchievementsView = ({ park }: AchievementsViewProps) => {
	const { data: parkActivity, isLoading: isParkActivityLoading } = useParkActivity(park.id);

	if (isParkActivityLoading || !parkActivity) return <LoadingPlaceholder what='your achievements' />;

	dbg('MISC', 'parkActivity', parkActivity);

	return (
		<div className='flex flex-col gap-3' data-testid='achievements-view'>
			<StampView date={parkActivity.stampCollectedAt} />
			<BucketList parkId={park.id} />
		</div>
	);
};

export default AchievementsView;
