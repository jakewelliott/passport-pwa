import { parks } from '../tables';

const getOne = (parkAbbreviation: string) => {
  const park = parks.find((park) => park.abbreviation === parkAbbreviation);
  if (!park) throw new Error(`Park not found: ${parkAbbreviation}`);
  return park;
};

const getAll = () => {
  return parks;
};

// TODO: add UploadGeoJson
// TODO: add GetGeoData
