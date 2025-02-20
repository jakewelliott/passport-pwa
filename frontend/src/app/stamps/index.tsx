import { StampDetails } from '@/app/stamps/components/stamp-details';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import type { Park, Stamp } from '@/lib/mock/types';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

// TODO: fix scrolling bug when selecting stamp in last row

const isVisited = (abbreviation: string, stamps: Stamp[]) =>
  stamps?.some((stamp) => stamp.abbreviation === abbreviation) ?? false;

const sortByName = (a: Park, b: Park) => a.parkName.localeCompare(b.parkName);

const StampView = ({
  abbreviation,
  handleClick,
  greyed,
}: { abbreviation: string; handleClick: () => void; greyed: boolean }) => {
  return (
    <button
      onClick={handleClick}
      className='flex items-center justify-center p-2'
      type='button'
      data-testid={`stamp-button-${abbreviation}`}
    >
      <img
        src={`/stamps/${abbreviation}.svg`}
        alt={`${abbreviation} - ${greyed ? 'greyed out' : 'achieved'}`}
        className={greyed ? 'opacity-50 grayscale' : ''}
        data-testid={`stamp-image-${abbreviation}`}
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
      toast.info(`You haven't collected the ${park.parkName} stamp yet!`);
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
      <div className='grid grid-cols-3 gap-4' data-testid='stamps-grid'>
        {sortedParks.map((park, index) => (
          <StampView
            key={park.abbreviation}
            abbreviation={park.abbreviation}
            greyed={!isVisited(park.abbreviation, stamps)}
            handleClick={() => handleStampClick(index, park)}
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
