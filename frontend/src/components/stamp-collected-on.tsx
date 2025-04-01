import DateHelper from '@/lib/date-helper';
import { dbg } from '@/lib/debug';
import type { CollectedStamp } from '@/types';

export const stampCollectedOn = (stamp?: CollectedStamp) => {
    dbg('RENDER', 'StampCollectedOn', stamp);
    const d = new Date(stamp?.createdAt ?? '');
    const dateString =
        stamp !== null && stamp !== undefined
            ? `Stamp collected on ${DateHelper.stringify(d)}`
            : 'Stamp not yet collected';
    return dateString;
};
