import { useParks, useParksGeo } from '@/hooks/queries/useParks';
import { useVisitPark } from '@/hooks/queries/useVisitPark';
import { useLocation } from '@/hooks/useLocation';
import { dbg, dbgif } from '@/lib/debug';
import type { Geopoint, Park, ParkGeoData } from '@/types';
import { buffer, booleanIntersects, booleanPointInPolygon } from '@turf/turf';
import { useEffect, useState } from 'react';
import wkt from 'wellknown';

// import the bounds from the geojson file, get the features and cast them to the correct type

export type ParkCheckResult = {
    park: Park | undefined;
    isLoading: boolean;
};

// CASE 0 -> {park, false} 			: user is in a park
// CASE 1 -> {undefined, false} : user is out of bounds
// CASE 2 -> {undefined, true} 	: user is loading
// CASE 3 -> {undefined, false} : user is error
// CASE 4 -> {park, true}			 	: this may occur between calls to useParkCheck

const castGeopoint = (geopoint: Geopoint): GeoJSON.Feature<GeoJSON.Point> => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [geopoint.latitude, geopoint.longitude],
        },
        properties: {},
    };
};

const parkCheck = (
    point: GeoJSON.Feature<GeoJSON.Point>,
    accuracy: number,
    parksGeo: ParkGeoData[],
): number | undefined => {
    for (const parkGeo of parksGeo) {
        try {
            const boundaries = wkt.parse(parkGeo.boundaries || '');
            if (boundaries?.type === 'GeometryCollection') {
                for (const geometry of boundaries?.geometries ?? []) {
                    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
                        // If point is within polygon, find and return matching park
                        if (booleanPointInPolygon(point, geometry)) {
                            return parkGeo.id;
                        }
                        // Create buffered point using accuracy radius
                        const bufferedPoint = buffer(point, accuracy, {
                            units: 'degrees',
                        }) as GeoJSON.Feature<GeoJSON.Polygon>;

                        // Check if either the point is in the polygon or the buffer intersects it
                        if (booleanPointInPolygon(point, geometry) || booleanIntersects(bufferedPoint, geometry)) {
                            return parkGeo.id;
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Failed to parse boundaries for park ${parkGeo.id}:`, error);
        }
    }
    dbg('ERROR', 'parkCheck', 'no park found');
    return undefined;
};

// make sure we check our park visits first so we don't have to make extra calls
export const useParkCheck = (): ParkCheckResult => {
    const [currentPark, setCurrentPark] = useState<Park | undefined>(undefined);
    const { data: parks, isLoading: parksLoading } = useParks();
    const { geopoint, isLoading: geopointLoading } = useLocation();
    const { data: parksGeo, isLoading: parksGeoLoading } = useParksGeo();

    const { mutate: markParkAsVisited } = useVisitPark();

    useEffect(() => {
        dbg('EFFECT', 'useParkCheck', 'checking park');

        if (!geopoint || !parks || !parksGeo) {
            dbgif(!geopoint, 'EFFECT', 'useParkCheck', 'no geopoint');
            dbgif(!parks, 'EFFECT', 'useParkCheck', 'no parks');
            dbgif(!parks, 'EFFECT', 'useParkCheck', 'no park geo data');
            return;
        }

        const point = castGeopoint(geopoint);
        const currentParkId = parkCheck(point, geopoint.inaccuracyRadius, parksGeo);

        dbgif(!currentParkId, 'ERROR', 'useParkCheck', 'park not found');

        if (currentParkId) {
            markParkAsVisited(currentParkId);
            const park = parks.find((park) => park.id === currentParkId);
            setCurrentPark(park);
        }
    }, [geopoint]);

    dbgif(parksLoading, 'HOOK', 'useParkCheck', 'parks loading');
    dbgif(geopointLoading, 'HOOK', 'useParkCheck', 'geopoint loading');
    dbgif(parksGeoLoading, 'HOOK', 'useParkCheck', 'parks geo data loading');
    dbgif(!!currentPark, 'HOOK', 'useParkCheck', currentPark?.parkName);

    return {
        park: currentPark,
        isLoading: !geopoint || !parks,
    };
};
