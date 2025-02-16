import { booleanPointInPolygon } from '@turf/turf';
import { useEffect, useState } from 'react';
import type { Geopoint, Park } from '@/lib/mock/types';
import { useParks } from '@/hooks/queries/useParks';
import geoJSONData from '@/lib/mock/geojson.json';
import { dbg, dbgif, sjason } from '@/lib/debug';
import { useLocation } from '@/hooks/useLocation';

// import the bounds from the geojson file, get the features and cast them to the correct type
const bounds = (geoJSONData as GeoJSON.FeatureCollection).features as GeoJSON.Feature<GeoJSON.Polygon>[];

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

const parkCheck = (point: GeoJSON.Feature<GeoJSON.Point>, parks: Park[]): Park | undefined => {
  const containingFeature = bounds.find((feature) => booleanPointInPolygon(point, feature.geometry));

  if (!containingFeature) return undefined;

  return parks.find((park) => park.parkName.startsWith(containingFeature.properties?.PK_NAME));
};

// TODO: add a mutation to update park visits
// make sure we check our park visits first so we don't have to make extra calls
export const useParkCheck = (spoof?: Geopoint): ParkCheckResult => {
  const [currentPark, setCurrentPark] = useState<Park | undefined>(undefined);
  const { data: parks, isLoading: parksLoading } = useParks();
  const { geopoint, isLoading: geopointLoading } = useLocation(spoof);

  useEffect(() => {
    dbg('EFFECT', 'useParkCheck', 'checking park');

    if (!geopoint || !parks) {
      dbgif(!geopoint, 'EFFECT', 'useParkCheck', 'no geopoint');
      dbgif(!parks, 'EFFECT', 'useParkCheck', 'no parks');
      return;
    }

    const point = castGeopoint(geopoint);
    const park = parkCheck(point, parks);
    dbgif(!park, 'ERROR', 'useParkCheck', 'park not found');

    setCurrentPark(park);
  }, [geopoint, parks]);

  dbgif(parksLoading, 'HOOK', 'useParkCheck', 'parks loading');
  dbgif(geopointLoading, 'HOOK', 'useParkCheck', 'geopoint loading');
  dbgif(!!currentPark, 'HOOK', 'useParkCheck', sjason(currentPark));

  return {
    park: currentPark,
    isLoading: !geopoint || !parks,
  };
};
