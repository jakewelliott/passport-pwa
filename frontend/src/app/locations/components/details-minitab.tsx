import type { Park, ParkIcon } from '@/types';
import type React from 'react';

const Highlight = ({ title, children }: { title: string; children?: React.ReactNode }) => {
	return (
		<p>
			<span className='green-text'>{title}</span>: {children}
		</p>
	);
};

const renderTrails = (trails: string) => {
	const trailLines = trails.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

	return (
		<div className='flex flex-col gap-1'>
			{trailLines.map((line) => (
				<div key={line}>{line}</div>
			))}
		</div>
	);
};

const IconView = ({ icon }: { icon: ParkIcon }) => {
	return <img src={`/icons/park/${icon.icon}.svg`} width={55} height={55} alt={`${icon.icon}`} />;
};

const ParkIcons = ({ park }: { park: Park }) => (
	<div data-testid='icon-scroll-container' className='icon-scroll-container overflow-x-auto'>
		<div className='inline-flex gap-6 px-6'>
			{park.icons?.map((icon) => (
				<IconView key={icon.icon} icon={icon} />
			))}
			<div className='w-px flex-shrink-0' />
		</div>
	</div>
);

export const DetailsMiniTab = ({ park }: { park: Park }) => {
	return (
		<div className='mt-6 mb-6 flex flex-col'>
			<div className='gap-2 pr-6 pl-6'>
				<Highlight title='Established'>{park.establishedYear}</Highlight>
				<Highlight title='Landmark'>{park.landmark}</Highlight>
				<Highlight title='You can find...'>{park.youCanFind}</Highlight>
				<div className='flex flex-col gap-1'>
					<Highlight title='Trails' />
					{renderTrails(park.trails)}
				</div>
			</div>
			<ParkIcons park={park} />
		</div>
	);
};
