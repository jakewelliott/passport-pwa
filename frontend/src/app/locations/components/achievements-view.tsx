import { BucketList } from '@/components/bucket-list';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { StampCollectedOn } from '@/components/stamp-collected-on';
import { useStamp } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park } from '@/types';
import { FaStamp } from 'react-icons/fa';

interface AchievementsViewProps {
	park: Park;
}

const StampView = ({ stamp }: { stamp?: CollectedStamp | null }) => {
	return (
		<div className='my-2.5 flex items-start'>
			<FaStamp size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
			<div className='flex w-full flex-col justify-center'>
				<StampCollectedOn stamp={stamp} />
			</div>
		</div>
	);
};

const AchievementsView = ({ park }: AchievementsViewProps) => {
	const { data: stamp, isLoading } = useStamp(park.abbreviation);

	if (isLoading) return <LoadingPlaceholder what='your achievements' />;

	dbg('MISC', 'stamp', stamp);

	return (
		<div className='flex flex-col gap-3' data-testid='achievements-view'>
			<StampView stamp={stamp} />
			<BucketList parkId={park.id} />
		</div>
	);
};

export default AchievementsView;
