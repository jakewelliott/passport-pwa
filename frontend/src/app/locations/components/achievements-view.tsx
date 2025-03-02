import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParkActivity } from '@/hooks/queries/useParks';
import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { BucketListCompletion, BucketListItem, Park } from '@/lib/mock/types';
import { FaRegCheckSquare, FaRegSquare, FaStamp } from 'react-icons/fa';

interface AchievementsViewProps {
	park: Park;
}

const BucketListItemView = ({
	item,
	completion,
	handler,
}: { item: BucketListItem; completion?: BucketListCompletion; handler: () => void }) => {
	const Icon = completion?.completed ? FaRegCheckSquare : FaRegSquare;
	const isCompleted = completion?.completed && completion.deleted === false;

	const updatedAtString = isCompleted
		? DateHelper.stringify(new Date(completion.updatedAt)).replace(',', ' at')
		: undefined;

	return (
		<div key={item.id} className='top-0 flex' {...a11yOnClick(handler)}>
			<Icon size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<p>{item.task}</p>
			{updatedAtString && <p>Completed at {updatedAtString}</p>}
		</div>
	);
};

const StampView = ({ date }: { date?: string }) => {
	const dateString =
		date !== undefined
			? `Stamp collected on ${DateHelper.stringify(new Date(date)).replace(',', ' at')}`
			: 'Stamp not yet collected';

	return (
		<div className='top-0 flex'>
			<FaStamp size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<p>{dateString}</p>
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
			{items && items.length > 0 && (
				<div className='flex flex-col gap-2'>
					{items.map((item) => (
						<BucketListItemView
							key={item.id}
							item={item}
							completion={completed?.find((completed) => completed.itemId === item.id)}
							handler={() => toggleCompletion(item.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AchievementsView;
