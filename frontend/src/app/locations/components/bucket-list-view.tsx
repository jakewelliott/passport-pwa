import { useBucketList } from '@/hooks/queries/useBucketList';
import { useStamp } from '@/hooks/queries/useStamps';
import DateHelper from '@/lib/date-helper';
import type { BucketListItem, CollectedStamp, Park } from '@/lib/mock/types';
import { FaRegCheckSquare, FaRegSquare, FaStamp } from 'react-icons/fa';

const BucketListItemView = ({ bucketListItem }: { bucketListItem: BucketListItem }) => {
	const isCompleted = bucketListItem.completedAt && !bucketListItem.deleted;
	const Checkbox = isCompleted ? FaRegCheckSquare : FaRegSquare;

	return (
		<div>
			<Checkbox size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<p data-testid={'BLI'}>
				Bucket List Item:
				<br />
				{bucketListItem.task}
			</p>
		</div>
	);
};

const StampView = ({ stamp }: { stamp: CollectedStamp | undefined }) => {
	return (
		<>
			<FaStamp size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<p>
				{stamp
					? `Stamp collected on ${DateHelper.stringify(new Date(stamp.createdAt)).replace(',', ' at')}`
					: 'Stamp not yet collected'}
			</p>
		</>
	);
};

export const BucketListView = ({ park }: { park: Park }) => {
	const { data: items, isLoading: itemsLoading } = useBucketList(park.id);
	const { data: stamp, isLoading: stampLoading } = useStamp(park.abbreviation);

	// TODO: replace with a placeholder
	if (itemsLoading || stampLoading) return null;

	return (
		<div className='flex flex-col gap-3' data-testid='achievements-view'>
			<div className='top-0 flex'>
				<StampView stamp={stamp} />
			</div>
			<div className='top-0 flex'>
				{items.map((item: BucketListItem) => (
					<BucketListItemView key={item.id} bucketListItem={item} />
				))}
			</div>
		</div>
	);
};
