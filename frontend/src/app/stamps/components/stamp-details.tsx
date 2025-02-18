import DateHelper from '@/lib/date-helper';
import { useStamp } from '@/hooks/queries/useStamps';
import { usePark } from '@/hooks/queries/useParks';
import { FaTimes } from 'react-icons/fa';
import { Stamp } from '@/lib/mock/types'

interface StampsDetailProps {
	abbreviation: string;
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

	if (parkLoading || !park || stampLoading ) 
		return null;

	return (
		<>
			{/* Dark overlay */}
			<div
				data-testid="overlay"
				className="fixed inset-0 bg-system_black opacity-75"
				style={{ zIndex: 40 }}
				onClick={handleClose}
			/>
			{/* Dialog */}
			<div
				className="fixed inset-0 flex items-center justify-center"
				style={{ zIndex: 50 }}
				onClick={handleClose}
			>
				<article
					className='relative w-full max-w-sm rounded-lg bg-supporting_lightblue p-4 mx-4 shadow-xl'
					onClick={e => e.stopPropagation()}
				>
					<header className='mb-4'>
						<div className='flex items-center justify-between'>
							<h3 className='font-semibold text-xl text-center'>{park.parkName}</h3>
							<button
								className='rounded-full p-2 transition-colors hover:bg-black/10'
								onClick={handleClose}
								type='button'
								aria-label='Close park details'
							>
								<FaTimes className='text-system_gray' />
							</button>
						</div>
					</header>
					<div className='space-y-3'>
						<div className='flex justify-center'>
							<img
								src={`/stamps/${code}.svg`}
								alt={`${code} stamp`}
								className='w-32 h-32'
							/>
						</div>
						<div className='space-y-2'>
							<p className='text-supporting_inactiveblue'>{park.addresses[0].city}</p>
							<CollectedOn stamp={stamp} />
							<CollectedManually stamp={stamp || null} />
							<a
								href={`/locations/${park.abbreviation}`}
								className='inline-block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
							>
								View Park Details <span aria-hidden='true'>&gt;</span>
							</a>
						</div>
					</div>
				</article>
			</div>
		</>
	);
};
