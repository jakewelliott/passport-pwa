import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { GenericIcon } from './generic-icon';
import { FaPen } from 'react-icons/fa6';
import { useUser } from '@/hooks/queries/useUser';

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
    testId?: string;
    handleEditItem: () => void;
}

export const BucketListItemView = ({ item, completion, handler, address, testId, handleEditItem }: BucketListItemViewProps) => {
    const completed = completion !== undefined;
    const { data: user } = useUser();

    return (
        <div className='flex'>
            <div
                key={item.id}
                className='flex w-full flex-col gap-2 rounded-md bg-trail_wildernessgateway p-2 text-system_white'
                {...a11yOnClick(handler)}
                data-testid={testId}
            >
                <GenericIcon
                    name={completed ? 'check' : 'uncheck'}
                    text={item.task}
                    color='system_white'
                    testId={completed ? 'checked-icon' : 'unchecked-icon'}
                />
                {address && <AddressView address={address} />}
                {completed && <CompletedAtView updatedAt={completion.updatedAt} />}
            </div>
            {user?.role === "admin" && (
                <div className='my-auto ml-auto w-7 pl-2'>
                <button
                    className='flex h-7 w-7 items-center justify-center rounded-full border border-system_black p-1'
                    onClick={handleEditItem}
                    type='button'
                >
                    <FaPen size={15} />
                </button>
            </div>
            )}
            
        </div>
    );
};
