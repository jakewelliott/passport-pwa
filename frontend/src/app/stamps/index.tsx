import { StampDetails } from '@/app/stamps/components/stamp-details';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park } from '@/lib/mock/types';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

// TODO: fix scrolling bug when selecting stamp in last row

const isVisited = (code: string, stamps: CollectedStamp[]) =>
  stamps?.some((stamp) => stamp.parkAbbreviation === code) ?? false;
const sortByName = (a: Park, b: Park) => a.parkName.localeCompare(b.parkName);

const Stamp = ({ code, handleClick, greyed }: { code: string; handleClick: () => void; greyed: boolean }) => {
  return (
    <button
      onClick={handleClick}
      className='flex items-center justify-center p-2'
      type='button'
      data-testid={`stamp-button-${code}`}
    >
      <img
        src={`/stamps/${code}.svg`}
        alt={`${code} - ${greyed ? 'greyed out' : 'achieved'}`}
        className={greyed ? 'opacity-50 grayscale' : ''}
        data-testid={`stamp-image-${code}`}
      />
    </button>
  );
};

// TODO: make this use a query instead of directly accessing dummy data
export default function Stamps() {
  dbg('RENDER', 'Stamps');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data: parks, isLoading: parksLoading } = useParks();
  const { data: stamps, isLoading: stampsLoading, refetch } = useStamps();
  const { isLoading: userLoading } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleStampClick = (index: number, park: Park) => {
    if (!isVisited(park.abbreviation, stamps ?? [])) {
      toast.info(`You haven't collected the ${park.parkName} stamp yet!`);
    }
    setSelectedIndex(index);
  };

  // TODO: toggle sort a/z, date last visited, date first achieved
  const sortedParks: Park[] = useMemo(() => {
    const achieved = parks?.filter((park) => isVisited(park.abbreviation, stamps ?? [])).sort(sortByName) || [];
    const notAchieved = parks?.filter((park) => !isVisited(park.abbreviation, stamps ?? [])).sort(sortByName) || [];
    return [...achieved, ...notAchieved];
  }, [parks, stamps]);

  if (userLoading || parksLoading || stampsLoading) return null;

  return (
    <div className='px-4 py-4'>
      <div className='grid grid-cols-3 gap-4' data-testid='stamps-grid'>
        {sortedParks.map((park, index) => (
          <Stamp
            key={park.abbreviation}
            code={park.abbreviation}
            greyed={!isVisited(park.abbreviation, stamps ?? [])}
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
