import type { Geopoint, Park } from '@/types';

export const calculateDistance = (geopoint: Geopoint | null, park: Park): number => {
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
