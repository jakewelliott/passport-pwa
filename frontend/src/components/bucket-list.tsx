import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParks } from '@/hooks/queries/useParks';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { BucketListItemView } from './bucket-list-item';
import { GenericIcon } from './generic-icon';
import { LoadingPlaceholder } from './loading-placeholder';

interface BucketListProps {
    parkId?: number;
    showAddress?: boolean;
}

/** Leave parkId blank to show all bucket list items. */
export const BucketList = ({ parkId, showAddress: showParkName = false }: BucketListProps) => {
    const { data: items, completed, toggleCompletion, isLoading } = useBucketList(parkId);
    const { data: parks } = useParks();

    if (isLoading || !items)
        return (
            <div className='m-6 flex flex-col'>
                <LoadingPlaceholder />
            </div>
        );

    const parkNameHelper = (item: BucketListItem) => {
        const park = parks?.find((park) => park.id === item.parkId);
        return park?.parkName;
    };

    const completedHelper = (item: BucketListItem) =>
        completed?.find((completed: BucketListCompletion) => completed.bucketListItemId === item.id);

    return (
        <div className='flex flex-col gap-2'>
            <GenericIcon name='ballot' text='Park Bucket List:' />
            {items.map((item: BucketListItem) => (
                <BucketListItemView
                    key={item.id}
                    item={item}
                    completion={completedHelper(item)}
                    handler={() => toggleCompletion(item.id)}
                    address={showParkName ? parkNameHelper(item) : undefined}
                    testId={'bucket-list-item'}
                />
            ))}
        </div>
    );
};
