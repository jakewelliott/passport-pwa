import type { ParkAbbreviation, Stamp } from '@/lib/mock/types';
import DateHelper from '@/lib/date-helper';
import { useStamp } from '@/hooks/queries/useStamps';
import { usePark } from '@/hooks/queries/useParks';
import { a11yOnClick } from '@/lib/a11y';

interface StampsDetailProps {
	abbreviation: ParkAbbreviation;
	handleClose: () => void;
}

const CollectedOn = ({ stamp }: { stamp: Stamp | null }) =>
	stamp == null ? (
		<p className='font-medium text-amber-600'>Stamp not yet collected</p>
	) : (
		<p className='font-medium'>Stamp collected on {DateHelper.stringify(stamp.timestamp)}</p>
	);

const CollectedManually = ({ stamp }: { stamp: Stamp | null }) =>
	stamp == null ? null : stamp.location !== null ? null : (
		<p className='font-medium text-amber-600'>Stamp collected manually</p>
	);



export const StampDetails = ({ abbreviation: code, handleClose }: StampsDetailProps) => {
	const { data: stamp, isLoading: stampLoading } = useStamp(code);
	const { data: park, isLoading: parkLoading } = usePark(code);

	if (parkLoading || !park) return null;
	if (stampLoading || !stamp) return null;

	return (
		<article className='relative bg-supporting_lightblue p-4'>
			<header>
				<div className='flex-row items-center justify-between'>
					<h3 className='pr-4 font-semibold text-xl'>{park.name}</h3>
					<button
						className='absolute top-2 right-2 rounded-full p-1 transition-colors hover:bg-black/10'
						onClick={handleClose}
						type='button'
						aria-label='Close park details'
					>
						{/* TODO: fix horizontal alignment */}
						<span className='cursor-pointer font-bold text-h4 text-system_gray' {...a11yOnClick(handleClose)}>
							&times;
						</span>
					</button>
				</div>
			</header>
			<div className=''>
				<p>{park.city}</p>
				<CollectedOn stamp={stamp} />
				<a
					href={`/locations/${park.abbreviation}`}
					className='inline-block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
				>
					View More Park Details <span aria-hidden='true'>&gt;</span>
				</a>
				<CollectedManually stamp={stamp || null} />
			</div>
		</article>
	);
};
