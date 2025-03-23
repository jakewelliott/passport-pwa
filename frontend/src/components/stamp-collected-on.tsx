import DateHelper from '@/lib/date-helper';
import type { CollectedStamp } from '@/types';

// ADAM: this is used in 2 places, so I'm moving it to a separate component
export const StampCollectedOn = ({ stamp }: { stamp?: CollectedStamp | null }) => {
  const d = new Date(stamp?.createdAt ?? '');
  const dateString =
    stamp !== null && stamp !== undefined ? `Stamp collected on ${DateHelper.stringify(d)}` : 'Stamp not yet collected';
  return <p data-testid='stamp-collected-on'>{dateString}</p>;
};
