import { useParks, useParksGeo } from '@/hooks/queries/useParks';
import { useLocation } from '@/hooks/useLocation';
import { dbg, dbgif, sjason } from '@/lib/debug';
import type { Geopoint, Park, ParkGeoData } from '@/lib/mock/types';
import { booleanPointInPolygon } from '@turf/turf';
import { useEffect, useState } from 'react';

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

// ADAM: we might wanna move this to lib if we use this elsewhere
// for now it's just here
const castGeopoint = (geopoint: Geopoint): GeoJSON.Feature<GeoJSON.Point> => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [geopoint.longitude, geopoint.latitude],
    },
    properties: {},
  };
};

const parkCheck = (point: GeoJSON.Feature<GeoJSON.Point>, parks: Park[], parksGeo: ParkGeoData[]): Park | undefined => {
  console.log(parksGeo[0].boundaries);
  parksGeo.forEach(park => {
    for (const geometry of park.boundaries.geometries) {
      if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
        if (booleanPointInPolygon(point, geometry)) {
          return parks.find((fullPark) => fullPark.abbreviation === park.abbreviation);
        }
      }
    }
  });
  return undefined;
};

// TODO: add a mutation to update park visits
// make sure we check our park visits first so we don't have to make extra calls
export const useParkCheck = (spoof?: Geopoint): ParkCheckResult => {
  const [currentPark, setCurrentPark] = useState<Park | undefined>(undefined);
  const { data: parks, isLoading: parksLoading } = useParks();
  const { geopoint, isLoading: geopointLoading } = useLocation(spoof);
  const { data: parksGeo, isLoading: parksGeoLoading } = useParksGeo();

  useEffect(() => {
    dbg('EFFECT', 'useParkCheck', 'checking park');

    if (!geopoint || !parks || !parksGeo) {
      dbgif(!geopoint, 'EFFECT', 'useParkCheck', 'no geopoint');
      dbgif(!parks, 'EFFECT', 'useParkCheck', 'no parks');
      dbgif(!parks, 'EFFECT', 'useParkCheck', 'no park geo data');
      return;
    }

    const point = castGeopoint(geopoint);
    const park = parkCheck(point, parks, parksGeo);
    dbgif(!park, 'ERROR', 'useParkCheck', 'park not found');

    setCurrentPark(park);
  }, [geopoint, parks]);

  dbgif(parksLoading, 'HOOK', 'useParkCheck', 'parks loading');
  dbgif(geopointLoading, 'HOOK', 'useParkCheck', 'geopoint loading');
  dbgif(parksGeoLoading, 'HOOK', 'useParkCheck', 'parks geo data loading');
  dbgif(!!currentPark, 'HOOK', 'useParkCheck', sjason(currentPark));

  return {
    park: currentPark,
    isLoading: !geopoint || !parks,
  };
};
