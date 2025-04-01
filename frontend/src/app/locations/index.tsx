import ListRow from '@/components/list-row';
import { FilterModal, type SortOption, filterParks, sortParks } from '@/components/sort-filter';
import { useFavoriteParks } from '@/hooks/queries/useParkFavorites';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useVisitsHistory } from '@/hooks/queries/useVisitPark';
import { useLocation } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import type { Park, ParkIcon } from '@/types';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoadingPlaceholder = () => {
    // TODO: add a loading placeholder (blank grey boxes)
    return <div data-testid='loading-placeholder'>Loading...</div>;
};

const Row = ({ park }: { park: Park }) => {
    const address = park.addresses?.[0]
        ? `${park.addresses?.[0].city}, ${park.addresses?.[0].state}`
        : 'Address not available';

    return (
        <ListRow>
            <div className='flex flex-col gap-1'>
                <h3>{park.parkName}</h3>
                <p>{address}</p>
            </div>
        </ListRow>
    );
};

export default function LocationsScreen() {
    dbg('RENDER', 'Locations');
    const { data: parks, isLoading, isError, error } = useParks();
    const { data: stamps } = useStamps();
    const { data: visitHistory } = useVisitsHistory();
    const { data: favoritedParks } = useFavoriteParks();
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
    const [selectedIcons, setSelectedIcons] = useState<Set<ParkIcon>>(() => {
        const saved = localStorage.getItem('parkSelectedIcons');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(() => {
        const saved = localStorage.getItem('showOnlyFavorites');
        return saved === 'true';
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

    const handleSelectedIconsChange = (newSelected: Set<ParkIcon>) => {
        setSelectedIcons(newSelected);
        localStorage.setItem('parkSelectedIcons', JSON.stringify(Array.from(newSelected)));
    };

    const handleShowOnlyFavoritesChange = (favorites: boolean) => {
        setShowOnlyFavorites(favorites);
        localStorage.setItem('showOnlyFavorites', favorites.toString());
    };

    if (isLoading) return <LoadingPlaceholder />;
    if (isError) return <div>Error: {error.message}</div>;
    if (!parks || parks.length === 0) return <div>No parks found</div>;

    const collectedStamps: { parkId: number }[] = [];
    if (stamps) {
        for (const x of stamps) {
            collectedStamps.push({ parkId: x.parkId });
        }
    }
    const filteredParks = sortParks(
        filterParks(parks, searchQuery, selectedIcons, favoritedParks || [], showOnlyFavorites),
        sortOption,
        isReverseOrder,
        favoritedParks || [],
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
            {filteredParks.map((park) => (
                <div className='m-3' key={park.id} data-testid={'park'}>
                    <Link to={`/locations/${park.abbreviation}`} className='text-supporting_inactiveblue no-underline'>
                        <Row park={park} />
                    </Link>
                </div>
            ))}
            <FilterModal
                isFilterModalOpen={isFilterModalOpen}
                handleCloseFilterModal={handleCloseFilterModal}
                handleSortOptionChange={handleSortOptionChange}
                sortOption={sortOption}
                handleReverseOrderChange={handleReverseOrderChange}
                isReverseOrder={isReverseOrder}
                handleSelectedIconsChange={handleSelectedIconsChange}
                selectedIcons={selectedIcons}
                favoritedParks={favoritedParks}
                showOnlyFavorites={showOnlyFavorites}
                handleShowOnlyFavoritesChange={handleShowOnlyFavoritesChange}
            />
        </>
    );
}
