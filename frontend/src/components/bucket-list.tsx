import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParkById } from '@/hooks/queries/useParks';
import { BucketListItemView } from './bucket-list-item';
import { LoadingPlaceholder } from './loading-placeholder';

interface BucketListProps {
  parkId?: number;
  showAddress?: boolean;
}

/** Leave parkId blank to show all bucket list items. */
export const BucketList = ({ parkId, showAddress = false }: BucketListProps) => {
  const { items, completed, toggleCompletion, isLoading } = useBucketList(parkId);
  const { data: park } = useParkById(parkId ?? 0);

  if (isLoading || !items || !completed) return <LoadingPlaceholder what='Your bucket list' />;

  return (
    <div className='flex flex-col'>
      {items.map((item) => (
        <BucketListItemView
          key={item.id}
          item={item}
          completion={completed?.find((completed) => completed.itemId === item.id)}
          handler={() => toggleCompletion(item.id)}
          address={showAddress ? park?.addresses[0].addressLineOne : undefined}
        />
      ))}
    </div>
  );
};
