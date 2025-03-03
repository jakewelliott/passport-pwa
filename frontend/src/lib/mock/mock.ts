import type { Park } from '@/types/tables';
import { parks } from './parks.json';
import { PARK_SPECIAL_CASES, toCamelCase } from './type-mapper';

export function transformPark(parkData: (typeof parks)[0]): Park {
  return {
    ...toCamelCase(parkData, PARK_SPECIAL_CASES),
    coordinates: JSON.parse(parkData.coordinates.replace('POINT (', '[').replace(')', ']')),
    addresses: [],
    icons: [],
    photos: [],
  } as Park;
}

export const mockPark = transformPark(parks[0]);
