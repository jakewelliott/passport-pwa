import { StampDetails } from '@/app/stamps/components/stamp-details';
import { FilterModal, filterParks, sortParks, type SortOption } from '@/components/sort-filter';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { useVisitsHistory } from '@/hooks/queries/useVisitPark';
import { useLocation } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park, ParkIconEnum } from '@/types';
import { useMemo, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const isVisited = (code: string, stamps: CollectedStamp[]) =>
    stamps?.some((stamp) => stamp.parkAbbreviation === code) ?? false;
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
export default function StampsScreen() {
    dbg('RENDER', 'StampsScreen');

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { data: parks, isLoading: parksLoading } = useParks();
    const { data: stamps, isLoading: stampsLoading } = useStamps();
    const { isLoading: userLoading } = useUser();
    const { data: visitHistory } = useVisitsHistory();
    const { geopoint } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>(() => {
        const saved = localStorage.getItem('parkSortOption');
        return (saved as SortOption) || 'alphabetical';
    });
    const [isReverseOrder, setIsReverseOrder] = useState(() => {
        const saved = localStorage.getItem('parkReverseOrder');
        return saved === 'true';
    });
    const [selectedIcons, setSelectedIcons] = useState<Set<ParkIconEnum>>(() => {
        const saved = localStorage.getItem('parkSelectedIcons');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [isTypingSearch, setIsTypingSearch] = useState(false);

    // Save settings to localStorage whenever they change
    const handleSortOptionChange = (option: SortOption) => {
        setSortOption(option);
        localStorage.setItem('parkSortOption', option);
    };

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleReverseOrderChange = (reverse: boolean) => {
        setIsReverseOrder(reverse);
        localStorage.setItem('parkReverseOrder', reverse.toString());
    };

    const handleSelectedIconsChange = (newSelected: Set<ParkIconEnum>) => {
        setSelectedIcons(newSelected);
        localStorage.setItem('parkSelectedIcons', JSON.stringify(Array.from(newSelected)));
    };

    if (userLoading || parksLoading || stampsLoading) return null;

    const collectedStamps: { parkId: number }[] = [];
    if (stamps) {
        for (const x of stamps) {
            collectedStamps.push({ parkId: x.parkId });
        }
    }
    const filteredParks = sortParks(
        filterParks(parks || [], searchQuery, selectedIcons),
        sortOption,
        isReverseOrder,
        collectedStamps,
        visitHistory,
        geopoint || undefined,
    );

    return (
        <>
        <div className='relative mx-3 mt-3 flex gap-2'>
                <div className='relative flex-1'>
                    <input
                        type='text'
                        placeholder='Search parks...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsTypingSearch(true)}
                        onBlur={() => setIsTypingSearch(false)}
                        className='w-full rounded-lg border border-system_gray p-3 pr-7 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
                    />
                    {searchQuery && (
                        <button
                            type='button'
                            onClick={() => setSearchQuery('')}
                            className='-translate-y-1/2 absolute top-1/2 right-3 transform text-system_gray hover:text-secondary_darkteal'
                            aria-label='Clear search'
                        >
                            &times;
                        </button>
                    )}
                </div>
                <button
                    type='button'
                    onClick={() => setIsFilterModalOpen(true)}
                    className={
                        'w-auto rounded-lg border border-system_gray bg-system_white px-3 py-2 transition-all duration-200'
                    }
                    style={{ display: isTypingSearch ? 'none' : 'inline' }}
                >
                    <FaFilter />
                </button>
            </div>
            <div className='px-4 py-4'>
            <div className='grid grid-cols-3 gap-4' data-testid='stamps-grid'>
                {filteredParks.map((park, index) => (
                    <StampView
                        key={park.abbreviation}
                        abbreviation={park.abbreviation}
                        greyed={!isVisited(park.abbreviation, stamps ?? [])}
                        handleClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>
            {selectedIndex !== null && filteredParks[selectedIndex] && (
                <StampDetails park={filteredParks[selectedIndex]} handleClose={() => setSelectedIndex(null)} />
            )}
        </div>
        <FilterModal
                isFilterModalOpen={isFilterModalOpen}
                handleCloseFilterModal={handleCloseFilterModal}
                handleSortOptionChange={handleSortOptionChange}
                sortOption={sortOption}
                handleReverseOrderChange={handleReverseOrderChange}
                isReverseOrder={isReverseOrder}
                handleSelectedIconsChange={handleSelectedIconsChange}
                selectedIcons={selectedIcons}
            />
        </>
        
    );
}
