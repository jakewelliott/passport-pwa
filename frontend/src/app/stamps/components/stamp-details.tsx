import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { a11yOnClick } from '@/lib/a11y';
import DateHelper from '@/lib/date-helper';
import type { CollectedStamp } from '@/lib/mock/types';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface StampsDetailProps {
	abbreviation: string;
	handleClose: () => void;
}

// Combined component for stamp collection status
const StampStatus = ({ stamp }: { stamp?: CollectedStamp }) => {
	if (!stamp) {
		return <p className='font-medium text-amber-600'>Stamp not yet collected</p>;
	}

	return (
		<>
			<p className='font-medium'>
				Stamp collected on {DateHelper.stringify(new Date(stamp.createdAt)).replace(',', ' at')}
			</p>
			{stamp.method === 'manual' && <p className='warning'>Stamp collected manually</p>}
		</>
	);
};

const StampImage = ({ code }: { code: string }) => (
	<div className='flex justify-center'>
		<img src={`/stamps/${code}.svg`} alt={`${code} stamp`} className='h-32 w-32' />
	</div>
);

const CloseButton = ({ handleClose }: { handleClose: () => void }) => (
	<button
		className='rounded-full p-2 transition-colors hover:bg-black/10'
		onClick={handleClose}
		type='button'
		aria-label='Close park details'
	>
		<FaTimes className='text-system_gray' />
	</button>
);

export const StampDetails = ({ abbreviation: code, handleClose }: StampsDetailProps) => {
	const { data: stamp, isLoading: stampLoading } = useStamp(code);
	const { data: park, isLoading: parkLoading } = usePark(code);

	if (parkLoading || stampLoading || !park) return null;

	const location = park.addresses[0] ? `${park?.addresses[0].city}, NC` : 'NC';

	return (
		<>
			{/* Dark overlay */}
			<div className='fixed inset-0 bg-system_black opacity-65' style={{ zIndex: 40 }} {...a11yOnClick(handleClose)} />

			{/* Dialog */}
			<div className='fixed inset-0 flex items-center justify-center' style={{ zIndex: 50 }} {...a11yOnClick(handleClose)}>
				<article
					className='relative mx-4 w-full max-w-sm rounded-lg bg-supporting_lightblue p-4 shadow-xl'
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
				>
					<header className='mb-4'>
						<div className='flex items-center justify-between'>
							<h3 className='text-center'>{park.parkName}</h3>
							<CloseButton handleClose={handleClose} />
						</div>
					</header>

					<div className='space-y-3'>
						<StampImage code={code} />

						<div className='space-y-2'>
							<p className='text-supporting_inactiveblue'>{location}</p>
							<StampStatus stamp={stamp} />
							<Link to={`/locations/${park.abbreviation}`} className='link inline-block'>
								View Park Details <span aria-hidden='true'>&gt;</span>
							</Link>
						</div>
					</div>
				</article>
			</div>
		</>
	);
};
