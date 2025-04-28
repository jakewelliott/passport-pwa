import { StampDetails } from '@/app/stamps/components/stamp-details';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { FilterModal, type SortOption, filterParks, sortParks } from '@/components/sort-filter';
import { useFavoriteParks } from '@/hooks/queries/useParkFavorites';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useVisitsHistory } from '@/hooks/queries/useVisitPark';
import { useLocation } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park, ParkIcon } from '@/types';
import { useEffect, useState } from 'react';
import { FilterMenu } from '../locations/components/filter-menu';

const isVisited = (code: string, stamps: CollectedStamp[]) =>
    stamps?.some((stamp) => stamp.parkAbbreviation === code) ?? false;

const StampView = ({ park, handleClick, greyed }: { park: Park; handleClick: () => void; greyed: boolean }) => {
    return (
        <button
            onClick={handleClick}
            className='flex items-center justify-center p-2'
            type='button'
            data-testid={`stamp-button-${park.abbreviation}`}
        >
            <img
                src={
                    park.stampImage && (park.stampImage.startsWith('http://') || park.stampImage.startsWith('https://'))
                        ? park.stampImage
                        : `/stamps/${park.stampImage}`
                }
                alt={`${park.abbreviation} - ${greyed ? 'greyed out' : 'achieved'}`}
                className={greyed ? 'opacity-50 grayscale' : ''}
                data-testid={`stamp-image-${park.abbreviation}`}
            />
        </button>
    );
};

/**
 * Stamps screen
 *
 * Shows a list of stamps with a search bar and filter options
 *
 * @returns {React.ReactNode} The stamps screen
 */
export default function StampsScreen() {
    dbg('RENDER', '/stamps');

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { data: parks, isLoading: parksLoading } = useParks();
    const { data: stamps, isLoading: stampsLoading, refetch } = useStamps();
    const { data: visitHistory } = useVisitsHistory();
    const { data: favoritedParks } = useFavoriteParks();
    const { geopoint } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        refetch();
    }, [refetch]);

    // ADAM: PLEASE use zustand for this and have it in an external hook
    // you can get it to persist the entire store really easily
    // or useReducer, or something

    const [sortOption, setSortOption] = useState<SortOption>(() => {
        const saved = localStorage.getItem('parkSortOption');
        return (saved as SortOption) || 'alphabetical';
    });
    const [isReverseOrder, setIsReverseOrder] = useState(() => {
        const saved = localStorage.getItem('parkReverseOrder');
        return saved === 'true';
    });
    const [selectedIcons, setSelectedIcons] = useState<Set<ParkIcon>>(() => {
        const saved = localStorage.getItem('parkSelectedIcons');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(() => {
        const saved = localStorage.getItem('showOnlyFavorites');
        return saved === 'true';
    });

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

    const handleSelectedIconsChange = (newSelected: Set<ParkIcon>) => {
        setSelectedIcons(newSelected);
        localStorage.setItem('parkSelectedIcons', JSON.stringify(Array.from(newSelected)));
    };

    const handleShowOnlyFavoritesChange = (favorites: boolean) => {
        setShowOnlyFavorites(favorites);
        localStorage.setItem('showOnlyFavorites', favorites.toString());
    };

    if (parksLoading || stampsLoading) return <LoadingPlaceholder what='stamps' />;

    const collectedStamps: { parkId: number }[] = [];
    if (stamps) {
        for (const x of stamps) {
            collectedStamps.push({ parkId: x.parkId });
        }
    }
    const filteredParks = sortParks(
        filterParks(parks ?? [], searchQuery, selectedIcons, favoritedParks ?? [], showOnlyFavorites),
        sortOption,
        isReverseOrder,
        favoritedParks ?? [],
        collectedStamps,
        visitHistory ?? [],
        geopoint,
    );

    return (
        <>
            <div className='flex flex-col gap-2'>
                <FilterMenu
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setIsFilterModalOpen={setIsFilterModalOpen}
                />
                <div className='grid grid-cols-3 gap-4' data-testid='stamps-grid'>
                    {filteredParks.map((park, index) => (
                        <StampView
                            key={park.abbreviation}
                            park={park}
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
                showOnlyFavorites={showOnlyFavorites}
                handleShowOnlyFavoritesChange={handleShowOnlyFavoritesChange}
            />
        </>
    );
}
