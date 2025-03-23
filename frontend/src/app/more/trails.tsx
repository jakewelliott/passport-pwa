import { TrailDetailView } from '@/app/more/components/trail-details';
import { TrailMap } from '@/app/more/components/trail-map';
import { trails } from '@/lib/testing/mock/tables';
import type { Trail } from '@/types';

export const Trails = () => {

	// TODO: make a hook for this
	const trailDetails: Trail[] = trails;

	return (
		<div className='m-6'>
			{trailDetails.map((trail) => (
				<TrailDetailView trail={trail} key={trail.id} />
			))}
			<img src='/TrailsLogo.svg' alt='Trails Logo' />
			<p className='text-center'>
				For maps and additional information on these state trails, please visit{' '}
				<a href='https://trails.nc.gov/state-trails' className='text-main_blue'>
					trails.nc.gov/state-trails
				</a>
			</p>
			<TrailMap />
		</div>
	);
};
