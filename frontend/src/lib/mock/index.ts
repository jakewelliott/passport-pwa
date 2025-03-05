import type { Park, Trail } from '@/types/tables';
import { parks } from './parks.json';
import { trail_icons } from './trail_icons.json';
import { trails } from './trails.json';
import { PARK_SPECIAL_CASES, toCamelCase } from './type-mapper';

// parks have geojson coordinates that need to be parsed

export function transformPark(parkData: (typeof parks)[0]): Park {
  return {
    ...toCamelCase(parkData, PARK_SPECIAL_CASES),
    coordinates: JSON.parse(parkData.coordinates.replace(')', ']').replace('POINT (', '[')),
    addresses: [],
    icons: [],
    photos: [],
  } as Park;
}

const transformedParks = parks.map(transformPark);
export { transformedParks as parks };
const mockPark = transformedParks[0];
export { mockPark };

// trails need to be parsed into the correct format and combined with their icons

export function transformTrail(trailData: (typeof trails)[0]): Trail {
  return {
    ...trailData,
    trailIcons: trail_icons.filter((icon) => icon.trail === trailData.id).map((icon) => icon.icon),
    trailName: trailData.trail_name,
    distance: trailData.length,
  } as Trail;
}

const transformedTrails = trails.map(transformTrail);

// json exports

export { bucket_list_items as bucketListItems } from './bucket_list_items.json';
export { collected_stamps as collectedStamps } from './collected_stamps.json';
export { completed_bucket_list_items as completedBucketListItems } from './completed_bucket_list_items.json';
export { park_addresses as parkAddresses } from './park_addresses.json';
export { park_icons as parkIcons } from './park_icons.json';
export { park_photos as parkPhotos } from './park_photos.json';
export { park_visits as parkVisits } from './park_visits.json';
export { private_notes as privateNotes } from './private_notes.json';
export { trail_icons as trailIcons } from './trail_icons.json';
export { users } from './users.json';
export { transformedTrails as trails };

// {} bucket_list_items.json
// i collected_stamps.json
// {3 completed_bucket_list_items.json
// TS index.ts
// {} park_addresses.json
// {} park_icons.json
// {} park_photos.json
// park_visits.json
// 1) parks.json
// 1) private_notes.json
// {} trail_icons.json
// • trails.json
// Ts type-mapper.ts
// 1, users.json ~/git/csc/2
