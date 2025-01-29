import { useMemo, useState } from 'react';
import { userStamps } from '@/lib/mock/user';
import { StampDetails } from './stamp-details';
import type { UserStamp, Park } from '@/lib/mock/types';
import parks from '@/lib/mock/parks';
import { stampSVG } from '@/lib/strings';

const isAchieved = (code: string) => userStamps.some((stamp: UserStamp) => stamp.code === code);

const sortByName = (a: Park, b: Park) => a.name.localeCompare(b.name);

const GRID_COLS = {
  default: 3,
  sm: 5,
  md: 6,
  lg: 8,
} as const;

// TODO: make this use a query instead of directly accessing dummy data
export const StampsOverview = () => {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  const sortedParks: Park[] = useMemo(() => {
    const achieved = parks.filter((park) => isAchieved(park.abbreviation)).sort(sortByName);

    const notAchieved = parks.filter((park) => !isAchieved(park.abbreviation)).sort(sortByName);

    return [...achieved, ...notAchieved];
  }, []);

  const rows = useMemo(() => {
    return sortedParks.reduce((acc: Park[][], park, index) => {
      const rowIndex = Math.floor(index / GRID_COLS.default);
      acc[rowIndex] = acc[rowIndex] || [];
      acc[rowIndex].push(park);
      return acc;
    }, []);
  }, [sortedParks]);

  const renderParkButton = (park: Park) => (
    <button
      key={park.abbreviation}
      onClick={() => setSelectedPark(park)}
      className='flex items-center justify-center p-2'
      type='button'
    >
      <img
        className={`h-24 min-h-[6rem] w-24 min-w-[6rem] object-contain transition-opacity ${
          isAchieved(park.abbreviation) ? 'opacity-100' : 'opacity-25'
        }`}
        src={stampSVG('CABE')}
        alt={`${park.name} stamp`}
      />
    </button>
  );

  const shouldShowDetails = (rowIndex: number) => {
    if (!selectedPark) return false;
    const parkIndex = sortedParks.indexOf(selectedPark);
    return parkIndex >= rowIndex * GRID_COLS.default && parkIndex < (rowIndex + 1) * GRID_COLS.default;
  };

  return (
    <div className='mx-auto my-4'>
      <div className='grid gap-4 px-4'>
        <StampDetails code={selectedPark?.abbreviation || 'CABE'} handleClose={() => setSelectedPark(null)} />
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <div className='grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8'>
              {row.map(renderParkButton)}
            </div>
            {shouldShowDetails(rowIndex) && selectedPark && (
              <div className='mt-4'>
                <StampDetails code={selectedPark.abbreviation} handleClose={() => setSelectedPark(null)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
