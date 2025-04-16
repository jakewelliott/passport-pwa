import DateHelper from '@/lib/date-helper';
import { dbg } from '@/lib/debug';
import type { CollectedStamp } from '@/types';
import { GenericIcon } from './generic-icon';

export const CollectedManually = ({ stamp }: { stamp?: CollectedStamp }) =>
    stamp?.method === 'manual' ? <p className='font-italic text-system-red'>Stamp collected manually</p> : null;

export const StampCollectedOn = ({ stamp }: { stamp?: CollectedStamp }) => {
    dbg('RENDER', 'StampCollectedOn', stamp);
    const d = new Date(stamp?.createdAt ?? '');
    const dateString =
        stamp !== null && stamp !== undefined
            ? `Stamp collected on ${DateHelper.stringify(d)}`
            : 'Stamp not yet collected';

    return (
        <div className='flex flex-col gap-2'>
            <GenericIcon name='stamp' text={dateString} testId='stamp-collected-on' />
            <CollectedManually stamp={stamp} />
        </div>
    );
};
