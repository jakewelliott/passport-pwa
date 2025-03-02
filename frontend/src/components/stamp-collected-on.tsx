import DateHelper from '@/lib/date-helper';

export const StampCollectedOn = ({ date }: { date?: string }) => {
	const dateString =
		date !== null && date !== undefined
			? `Stamp collected on ${DateHelper.stringify(new Date(date))}`
			: 'Stamp not yet collected';
	return <p>{dateString}</p>;
};
