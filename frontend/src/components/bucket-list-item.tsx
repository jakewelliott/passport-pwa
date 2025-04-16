import { useUser } from '@/hooks/queries/useUser';
import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { FaPen } from 'react-icons/fa6';
import { GenericIcon } from './generic-icon';

const CompletedAtView = ({ updatedAt }: { updatedAt: Date }) => (
    <div className='w-fit rounded-lg bg-supporting-terracotta p-2 text-system-white'>
        <p className='text-xs'>Completed on {DateHelper.toStringLong(new Date(updatedAt))}</p>
    </div>
);

interface BucketListItemViewProps {
    item: BucketListItem;
    completion?: BucketListCompletion;
    handler: () => void;
    address?: string;
    testId?: string;
    handleEditItem: () => void;
}

export const BucketListItemView = ({
    item,
    completion,
    handler,
    address,
    testId,
    handleEditItem,
}: BucketListItemViewProps) => {
    const completed = completion !== undefined;
    const { data: user } = useUser();

    return (
        <div className='flex'>
            <div
                key={item.id}
                className='flex w-full flex-col gap-2 rounded-md bg-trail-wildernessgateway p-2 text-system-white'
                {...a11yOnClick(handler)}
                data-testid={testId}
            >
                <GenericIcon
                    name={completed ? 'check' : 'uncheck'}
                    text={item.task}
                    color='system-white'
                    testId={completed ? 'checked-icon' : 'unchecked-icon'}
                />
                {address && <p className='font-SSPR text-sm'>{address}</p>}
                {completed && <CompletedAtView updatedAt={completion.updatedAt} />}
            </div>
            {user?.role === 'admin' && (
                <div className='my-auto ml-auto w-7 pl-2'>
                    <button
                        className='flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
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
