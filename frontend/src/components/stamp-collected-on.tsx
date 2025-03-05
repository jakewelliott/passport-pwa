import DateHelper from '@/lib/date-helper';
import type { CollectedStamp } from '@/types';
export const StampCollectedOn = ({ stamp }: { stamp?: CollectedStamp }) => {
	const d = new Date(stamp?.createdAt ?? '');
	const dateString =
		stamp !== null && stamp !== undefined ? `Stamp collected on ${DateHelper.stringify(d)}` : 'Stamp not yet collected';
	return <p>{dateString}</p>;
};
