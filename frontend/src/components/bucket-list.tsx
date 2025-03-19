import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParks } from '@/hooks/queries/useParks';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { BucketListItemView } from './bucket-list-item';
import { LoadingPlaceholder } from './loading-placeholder';

interface BucketListProps {
	parkId?: number;
	showAddress?: boolean;
}

/** Leave parkId blank to show all bucket list items. */
export const BucketList = ({ parkId, showAddress: showParkName = false }: BucketListProps) => {
	const { items, completed, toggleCompletion, isLoading } = useBucketList(parkId);
	const { data: parks } = useParks();

	if (isLoading || !items) return <LoadingPlaceholder what='Your bucket list' />;

	const parkNameHelper = (item: BucketListItem) => {
		const park = parks?.find((park) => park.id === item.parkId);
		return park?.parkName;
	};

	const completedHelper = (item: BucketListItem) => completed?.find((completed: BucketListCompletion) => completed.bucketListItemId === item.id);

	return (
		<div className='flex flex-col m-6'>
			{items.map((item: BucketListItem) => (
				<BucketListItemView
					key={item.id}
					item={item}
					completion={completedHelper(item)}
					handler={() => toggleCompletion(item.id)}
					address={showParkName ? parkNameHelper(item) : undefined}
				/>
			))}
		</div>
	);
};
