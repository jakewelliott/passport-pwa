import { useMemo, useState } from 'react';
import { StampDetails } from '@/app/stamps/components/stamp-details';
import type { Park } from '@/lib/mock/types';
import { useParks } from '@/hooks/queries/useParks';
import { useUser } from '@/hooks/queries/useUser';
import { useStamps } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import { toast } from 'react-toastify';

// TODO: fix scrolling bug when selecting stamp in last row

const isVisited = (code: string, stamps: { code: string }[] | undefined) =>
	stamps?.some(stamp => stamp.code === code) ?? false;
const sortByName = (a: Park, b: Park) => a.name.localeCompare(b.name);

const Stamp = ({ code, handleClick, greyed, parkName }: { code: string; handleClick: () => void; greyed: boolean; parkName: string }) => {
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

	const { data: parks, isLoading: parksLoading } = useParks();
	const { data: stamps, isLoading: stampsLoading } = useStamps();
	const { isLoading: userLoading } = useUser();

	const handleStampClick = (index: number, park: Park) => {
		if (!isVisited(park.abbreviation, stamps)) {
			toast.info(`You haven't collected the ${park.name} stamp yet!`);
		}
		setSelectedIndex(index);
	};

	// TODO: toggle sort a/z, date last visited, date first achieved
	const sortedParks: Park[] = useMemo(() => {
		const achieved = parks?.filter((park) => isVisited(park.abbreviation, stamps)).sort(sortByName) || [];
		const notAchieved = parks?.filter((park) => !isVisited(park.abbreviation, stamps)).sort(sortByName) || [];
		return [...achieved, ...notAchieved];
	}, [parks, stamps]);

	if (userLoading || parksLoading || stampsLoading) return null;

	return (
		<div className='px-4 py-4'>
			<div className='grid grid-cols-3 gap-4'>
				{sortedParks.map((park, index) => (
					<Stamp
						key={park.abbreviation}
						code={park.abbreviation}
						greyed={!isVisited(park.abbreviation, stamps)}
						handleClick={() => handleStampClick(index, park)}
						parkName={park.name}
					/>
				))}
			</div>
			{selectedIndex !== null && sortedParks[selectedIndex] && (
				<StampDetails
					abbreviation={sortedParks[selectedIndex].abbreviation}
					handleClose={() => setSelectedIndex(null)}
				/>
			)}
		</div>
	);
}
