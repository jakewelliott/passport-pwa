import ListRow from '@/components/list-row';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useVisitsHistory } from '@/hooks/queries/useVisitPark';
import { useLocation } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import type { Park, ParkIconEnum, ParkVisit } from '@/types';
import { BlackIcons, BlazeIcons, BlueIcons, GreenIcons, RedIcons, getParkIconTooltip } from '@/types/misc';
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

type SortOption = 'alphabetical' | 'favorited' | 'stamps' | 'lastVisited' | 'distance';

export default function LocationsScreen() {
    dbg('RENDER', 'Locations');
    const { data: parks, isLoading, isError, error } = useParks();
    const { data: stamps } = useStamps();
    const { data: visitHistory } = useVisitsHistory();
    const { geopoint } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('alphabetical');
    const [isReverseOrder, setIsReverseOrder] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState<Set<ParkIconEnum>>(new Set());

    if (isLoading) return <LoadingPlaceholder />;
    if (isError) return <div>Error: {error.message}</div>;
    if (!parks || parks.length === 0) return <div>No parks found</div>;

    const calculateDistance = (park: Park) => {
        if (!geopoint) return Infinity;
        const R = 6371; // Earth's radius in km
        const lat1 = (geopoint.latitude * Math.PI) / 180;
        const lat2 = (park.coordinates.latitude * Math.PI) / 180;
        const deltaLat = ((park.coordinates.latitude - geopoint.latitude) * Math.PI) / 180;
        const deltaLon = ((park.coordinates.longitude - geopoint.longitude) * Math.PI) / 180;

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const sortParks = (parks: Park[]) => {
        return [...parks].sort((a, b) => {
            // Primary sort based on selected option
            let primarySort = 0;
            switch (sortOption) {
                case 'alphabetical': {
                    primarySort = a.parkName.localeCompare(b.parkName);
                    break;
                }
                case 'favorited': {
                    // TODO: Implement favorited sorting when favorites feature is added
                    primarySort = 0;
                    break;
                }
                case 'stamps': {
                    const aHasStamp = stamps?.some((s) => s.parkId === a.id);
                    const bHasStamp = stamps?.some((s) => s.parkId === b.id);
                    primarySort = (bHasStamp ? 1 : 0) - (aHasStamp ? 1 : 0);
                    break;
                }
                case 'lastVisited': {
                    const aLastVisit = visitHistory?.find((v: ParkVisit) => v.parkId === a.id)?.updatedAt;
                    const bLastVisit = visitHistory?.find((v: ParkVisit) => v.parkId === b.id)?.updatedAt;
                    primarySort = (bLastVisit?.getTime() ?? 0) - (aLastVisit?.getTime() ?? 0);
                    break;
                }
                case 'distance': {
                    primarySort = calculateDistance(a) - calculateDistance(b);
                    break;
                }
                default: {
                    primarySort = 0;
                    break;
                }
            }

            // If primary sort is equal (0), use alphabetical as fallback
            if (primarySort === 0) {
                primarySort = a.parkName.localeCompare(b.parkName);
            }

            // Apply reverse order if enabled
            return isReverseOrder ? -primarySort : primarySort;
        });
    };

    const filterParks = (parks: Park[]) => {
        return parks.filter((park) => {
            // Text search filter
            const matchesSearch =
                park.parkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (park.addresses?.length > 0 &&
                    park.addresses?.[0].city.toLowerCase().includes(searchQuery.toLowerCase()));

            // Icon filter
            const matchesIcons =
                selectedIcons.size === 0 || park.icons.some((icon) => selectedIcons.has(icon.iconName));

            return matchesSearch && matchesIcons;
        });
    };

    const filteredParks = sortParks(filterParks(parks));

    const FilterModal = () => {
        if (!isFilterModalOpen) return null;

        const allIcons = [
            ...Object.values(RedIcons),
            ...Object.values(BlueIcons),
            ...Object.values(GreenIcons),
            ...Object.values(BlackIcons),
            ...Object.values(BlazeIcons),
        ] as ParkIconEnum[];

        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-system_black bg-opacity-50'>
                <div className='max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-system_white p-6'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>Sort & Filter</h2>
                        <button
                            type='button'
                            onClick={() => setIsFilterModalOpen(false)}
                            className='text-h2 hover:text-gray-700' // Increased size
                        >
                            &times;
                        </button>
                    </div>

                    <div className='mb-6'>
                        <h3 className='mb-2 font-semibold'>Sort By</h3>
                        <div className='flex gap-2'>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className='flex-1 appearance-none rounded border p-2'
                                style={{
                                    background: 'url("icons/misc/AngleDown.svg") no-repeat #fff',
                                    backgroundPosition: 'calc(100% - 8px) center',
                                }}
                            >
                                <option value='alphabetical'>Alphabetically</option>
                                <option value='favorited'>Favorited Parks</option>
                                <option value='stamps'>Stamp Collection Status</option>
                                <option value='lastVisited'>Last Visited Date</option>
                                <option value='distance'>Distance from Current Location</option>
                            </select>
                            <button
                                type='button'
                                onClick={() => setIsReverseOrder(!isReverseOrder)}
                                className='rounded border p-2 hover:bg-gray-100'
                                title={isReverseOrder ? 'Sort ascending' : 'Sort descending'}
                            >
                                {isReverseOrder ? '↑' : '↓'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className='mb-2 font-semibold'>Filter by Features</h3>
                        <div className='grid grid-cols-2 gap-2'>
                            {allIcons.map((icon) => (
                                <label key={icon} className='flex items-center space-x-2'>
                                    <input
                                        type='checkbox'
                                        checked={selectedIcons.has(icon)}
                                        onChange={(e) => {
                                            const newSelected = new Set(selectedIcons);
                                            if (e.target.checked) {
                                                newSelected.add(icon);
                                            } else {
                                                newSelected.delete(icon);
                                            }
                                            setSelectedIcons(newSelected);
                                        }}
                                        className='rounded'
                                    />
                                    <span>{getParkIconTooltip(icon)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='relative mx-3 mt-3 flex gap-2'>
                <div className='relative flex-1'>
                    <input
                        type='text'
                        placeholder='Search parks...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    className={'w-auto rounded-lg border border-system_gray bg-system_white px-3 py-2 transition-all duration-200'}
                    style={{display: searchQuery ? 'none' : 'inline'}}
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
            <FilterModal />
        </>
    );
}
