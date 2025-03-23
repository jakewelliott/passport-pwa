import { BucketList } from '@/components/bucket-list';
import { StampCollectedOn } from '@/components/stamp-collected-on';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park } from '@/types';
import { FaStamp } from 'react-icons/fa';

const StampView = ({ stamp }: { stamp?: CollectedStamp }) => {
	return (
		<div className='my-2.5 flex items-start'>
			<FaStamp size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
			<div className='flex w-full flex-col justify-center'>
				<StampCollectedOn stamp={stamp} />
			</div>
		</div>
	);
};

const AchievementsView = ({ park, stamp }: { park: Park; stamp?: CollectedStamp }) => {
	dbg('MISC', 'stamp', stamp);

	return (
		<div className='flex flex-col gap-3' data-testid='achievements-view'>
			<StampView stamp={stamp} />
			<div className='-m-6'>
				<BucketList parkId={park.id} />
			</div>
		</div>
	);
};

export default AchievementsView;
