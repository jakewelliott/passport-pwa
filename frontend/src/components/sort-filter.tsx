// src/utils/parkUtils.ts
import type { Park, ParkIconEnum, ParkVisit } from '@/types';
import { RedIcons, BlueIcons, GreenIcons, BlazeIcons, getParkIconTooltip } from '@/types';

export const calculateDistance = (geopoint: { latitude: number; longitude: number } | null, park: Park): number => {
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

export type SortOption = 'alphabetical' | 'favorited' | 'stamps' | 'lastVisited' | 'distance';

export const sortParks = (
    parks: Park[],
    sortOption: 'alphabetical' | 'favorited' | 'stamps' | 'lastVisited' | 'distance',
    isReverseOrder: boolean,
    stamps?: { parkId: number }[],
    visitHistory?: ParkVisit[],
    geopoint?: { latitude: number; longitude: number }
): Park[] => {
    return [...parks].sort((a, b) => {
        let primarySort = 0;
        switch (sortOption) {
            case 'alphabetical':
                primarySort = a.parkName.localeCompare(b.parkName);
                break;
            case 'favorited':
                primarySort = 0; // Implement favorited sorting when available
                break;
            case 'stamps': {
                const aHasStamp = stamps?.some((s) => s.parkId === a.id);
                const bHasStamp = stamps?.some((s) => s.parkId === b.id);
                primarySort = (bHasStamp ? 1 : 0) - (aHasStamp ? 1 : 0);
                break;
            }
            case 'lastVisited': {
                const aLastVisit = visitHistory?.find((v) => v.parkId === a.id)?.updatedAt;
                const bLastVisit = visitHistory?.find((v) => v.parkId === b.id)?.updatedAt;
                primarySort = (bLastVisit?.getTime() ?? 0) - (aLastVisit?.getTime() ?? 0);
                break;
            }
            case 'distance':
                primarySort = calculateDistance(geopoint || null, a) - calculateDistance(geopoint || null, b);
                break;
        }
        if (primarySort === 0) {
            primarySort = a.parkName.localeCompare(b.parkName);
        }
        return isReverseOrder ? -primarySort : primarySort;
    });
};

export const filterParks = (
    parks: Park[],
    searchQuery: string,
    selectedIcons: Set<ParkIconEnum>
): Park[] => {
    return parks.filter((park) => {
        const matchesSearch =
            park.parkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (park.addresses?.length > 0 &&
                park.addresses[0].city.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesIcons =
            selectedIcons.size === 0 ||
            Array.from(selectedIcons).every((selectedIcon) =>
                park.icons.some((icon) => icon.iconName.split('-')[0] === selectedIcon)
            );

        return matchesSearch && matchesIcons;
    });
};

export const FilterModal = (
    {
        isFilterModalOpen,
        handleCloseFilterModal,
        handleSortOptionChange,
        sortOption,
        handleReverseOrderChange,
        isReverseOrder,
        handleSelectedIconsChange,
        selectedIcons
    }: {
        isFilterModalOpen: boolean;
        handleCloseFilterModal: () => void;
        handleSortOptionChange: (option: SortOption) => void;
        sortOption: SortOption;
        handleReverseOrderChange: (reverse: boolean) => void;
        isReverseOrder: boolean;
        handleSelectedIconsChange: (newSelected: Set<ParkIconEnum>) => void;
        selectedIcons: Set<ParkIconEnum>;
    }
) => {
    if (!isFilterModalOpen) return null;

    const allIcons = [
        ...Object.values(RedIcons),
        ...Object.values(BlueIcons),
        ...Object.values(GreenIcons),
        ...Object.values(BlazeIcons),
    ] as ParkIconEnum[];

    const sortedIcons = [...allIcons].sort((a, b) => 
    getParkIconTooltip(a).localeCompare(getParkIconTooltip(b))
);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-system_black bg-opacity-50'>
            <div className='max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-system_white p-6'>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='font-bold text-xl'>Sort & Filter</h2>
                    <button
                        type='button'
                        onClick={() => handleCloseFilterModal()}
                        className='text-h2'
                    >
                        &times;
                    </button>
                </div>

                <div className='mb-6'>
                    <h3 className='mb-2 font-semibold'>Sort By</h3>
                    <div className='flex gap-2'>
                        <select
                            value={sortOption}
                            onChange={(e) => handleSortOptionChange(e.target.value as SortOption)}
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
                            onClick={() => handleReverseOrderChange(!isReverseOrder)}
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
                        {sortedIcons.map((icon) => (
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
                                        handleSelectedIconsChange(newSelected);
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