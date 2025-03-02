import type { Park } from '@/types';
import React from 'react';

export const DetailsMiniTab = ({ park }: { park: Park }) => {
	const renderTrails = (trails: string) => {
		return trails
			.split('\n')
			.filter((line) => line.trim() !== '') // Remove empty lines
			.map((line, index, array) => (
				<React.Fragment key={line}>
					{line}
					{index < array.length - 1 && <br />} {/* Add <br /> only if it's not the last line */}
				</React.Fragment>
			));
	};

	return (
		<div className='mt-6 mb-6 flex flex-col'>
			<p className='pr-6 pl-6'>
				{park.establishedYear && (
					<>
						<span className='green-text'>Established: </span>
						{park.establishedYear}
						<br />
						<br />
					</>
				)}
				{park.landmark && (
					<>
						<span className='green-text'>Landmark: </span>
						{park.landmark}
						<br />
						<br />
					</>
				)}
				{park.youCanFind && (
					<>
						<span className='green-text'>You can find... </span>
						{park.youCanFind}
						<br />
						<br />
					</>
				)}
				{park.trails && (
					<>
						<span className='green-text'>Trails: </span>
						<br />
						{renderTrails(park.trails)}
						<br />
						<br />
					</>
				)}
			</p>
			<div data-testid='icon-scroll-container' className='icon-scroll-container overflow-x-auto'>
				<div className='inline-flex gap-6 px-6'>
					{park.icons?.map((icon, index) => (
						<img
							src={`/icons/park/${icon.iconName}.svg`}
							width={55}
							height={55}
							key={icon.iconName}
							alt={`Park icon ${index + 1}`}
						/>
					))}
					<div className='w-px flex-shrink-0' />
				</div>
			</div>
		</div>
	);
};
