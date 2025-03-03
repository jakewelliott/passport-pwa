import type { Address, Geopoint } from './misc';

export interface UserProfile {
  id: number;
  username: string;
  role: string;
  token?: string;
}

export interface Park {
  id: number;
  parkName: string;
  coordinates: Geopoint;
  phone: number;
  email: string;
  establishedYear: string;
  landmark: string;
  youCanFind: string;
  trails: string;
  website: string;
  addresses: Address[];
  icons: { iconName: string }[];
  // bucketListItems: { id: number; task: string }[];
  photos: { photoPath: string; alt: string }[];
  abbreviation: string;
}

export interface Trail {
  id: number;
  trailName: string;
  trailIcons: string[];
  distance: string;
  description: string;
}

export interface ParkGeoData {
  id: number;
  abbreviation: string;
  parkName: string;
  coordinates: Geopoint;
  boundaries: string;
}

export interface BucketListItem {
  id: number;
  parkId: number;
  task: string;
}
