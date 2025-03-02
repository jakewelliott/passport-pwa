import DateHelper from '@/lib/date-helper';
import type { CollectedStamp } from '@/types';

export const StampCollectedOn = ({ stamp }: { stamp?: CollectedStamp }) => {
	const dateString =
		stamp !== null && stamp !== undefined
			? `Stamp collected on ${DateHelper.stringify(new Date(stamp.createdAt))}`
			: 'Stamp not yet collected';
	return <p>{dateString}</p>;
};
