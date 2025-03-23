import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

const CompletedAtView = ({ updatedAt }: { updatedAt: Date }) => (
	<div className='flex flex-wrap items-center justify-end gap-2 py-2'>
		<p className='p-mini'>Completed on {DateHelper.toStringLong(new Date(updatedAt))}</p>
	</div>
);

const AddressView = ({ address }: { address: string }) => (
	<div className='flex flex-wrap items-center justify-end gap-2'>
		<p className='p-mini'>{address}</p>
	</div>
);

interface BucketListItemViewProps {
	item: BucketListItem;
	completion?: BucketListCompletion;
	handler: () => void;
	address?: string;
}

const CheckedIcon = () => (<FaRegCheckSquare size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} data-testid='checked-icon' />)
const UncheckedIcon = () => (<FaRegSquare size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} data-testid='unchecked-icon' />)

export const BucketListItemView = ({ item, completion, handler, address }: BucketListItemViewProps) => {
	const completed = completion !== undefined;
	const Icon = completed ? CheckedIcon : UncheckedIcon;

	return (
		<div key={item.id} className='my-2.5 flex items-start' {...a11yOnClick(handler)}>
			<Icon />
			<div className='flex w-full flex-col justify-center'>
				<p>{item.task}</p>
				<div className='flex flex-wrap items-center gap-2'>
					{address && <AddressView address={address} />}
					{completed && <CompletedAtView updatedAt={completion.updatedAt} />}
				</div>
			</div>
		</div>
	);
};
