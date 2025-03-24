import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { GenericIcon } from './generic-icon';

const CompletedAtView = ({ updatedAt }: { updatedAt: Date }) => (
  <div className='w-fit rounded-lg bg-supporting_terracotta p-2 text-system_white'>
    <p className='p-mini'>Completed on {DateHelper.toStringLong(new Date(updatedAt))}</p>
  </div>
);

const AddressView = ({ address }: { address: string }) => <p className='p-mini'>{address}</p>;

interface BucketListItemViewProps {
  item: BucketListItem;
  completion?: BucketListCompletion;
  handler: () => void;
  address?: string;
}

export const BucketListItemView = ({ item, completion, handler, address }: BucketListItemViewProps) => {
  const completed = completion !== undefined;
  return (
    <div
      key={item.id}
      className='flex w-fit flex-col gap-2 rounded-md bg-trail_wildernessgateway p-2 text-system_white'
      {...a11yOnClick(handler)}
    >
      <GenericIcon name={completed ? 'check' : 'uncheck'} text={item.task} color='system_white' />
      {address && <AddressView address={address} />}
      {completed && <CompletedAtView updatedAt={completion.updatedAt} />}
    </div>
  );
};
