import { useMemo, useState } from 'react';
import { StampDetails } from '@/app/stamps/components/stamp-details';
import type { Park } from '@/lib/mock/types';
import { useParks } from '@/hooks/queries/useParks';
import { dbg } from '@/lib/debug';

// TODO: fix scrolling bug when selecting stamp in last row

const isVisited = (code: string) => !code && false;
const sortByName = (a: Park, b: Park) => a.name.localeCompare(b.name);

const GRID_COLS = {
	default: 3,
	sm: 5,
	md: 6,
	lg: 8,
} as const;

const Stamp = ({ code, handleClick, greyed }: { code: string; handleClick: () => void; greyed: boolean }) => {
	return (
		<button onClick={handleClick} className='flex items-center justify-center p-2' type='button'>
			<img
				src={`/stamps/${code}.svg`}
				alt={`${code} - ${greyed ? 'greyed out' : 'achieved'}`}
				className={greyed ? 'opacity-50 grayscale' : ''}
			/>
		</button>
	);
};

// TODO: make this use a query instead of directly accessing dummy data
export default function Stamps() {
	dbg('RENDER', 'Stamps');
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const { data: parks, isLoading } = useParks();

	// TODO: toggle sort a/z, date visited,
	const sortedParks: Park[] = useMemo(() => {
		const achieved = parks?.filter((park) => isVisited(park.abbreviation)).sort(sortByName) || [];
		const notAchieved = parks?.filter((park) => !isVisited(park.abbreviation)).sort(sortByName) || [];
		return [...achieved, ...notAchieved];
	}, [parks]);

	const rows = useMemo(() => {
		return sortedParks.reduce((acc: Park[][], park, index) => {
			const rowIndex = Math.floor(index / GRID_COLS.default);
			acc[rowIndex] = acc[rowIndex] || [];
			acc[rowIndex].push(park);
			return acc;
		}, []);
	}, [sortedParks]);

	const shouldShowDetails = (rowIndex: number) => {
		if (selectedIndex === null) return false;
		const parkIndex = selectedIndex;
		return parkIndex >= rowIndex * GRID_COLS.default && parkIndex < (rowIndex + 1) * GRID_COLS.default;
	};

	// TODO: add a loading state, its down here b/c rules of hooks
	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='mx-auto my-4'>
			<div className='grid gap-4 px-4'>
				{rows.map((row, rowIndex) => (
					<div key={`row-${row[0].abbreviation}`}>
						<div className='grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8'>
							{row.map((park, i) => (
								<Stamp
									key={park.abbreviation}
									code={park.abbreviation}
									greyed={!isVisited(park.abbreviation)}
									handleClick={() => setSelectedIndex(rowIndex * GRID_COLS.default + i)}
								/>
							))}
						</div>
						{shouldShowDetails(rowIndex) && sortedParks[selectedIndex || 0] && (
							<div className='mt-4'>
								<StampDetails
									abbreviation={sortedParks[selectedIndex || 0].abbreviation}
									handleClose={() => setSelectedIndex(null)}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
