import type { Park } from '@/types';
import { parks } from './tables/index';

export const Get = (parkAbbreviation: string): Park => {
  const park = parks.find((park: Park) => park.abbreviation === parkAbbreviation);
  if (!park) throw new Error(`Park not found: ${parkAbbreviation}`);
  return park;
};

export const GetAll = (): Park[] => {
  return parks;
};

// TODO: add UploadGeoJson
// TODO: add GetGeoData
