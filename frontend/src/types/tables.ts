// Types for tables in the database

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

export interface ParkVisit {
  id: number;
  parkId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectedStamp {
  id: number;
  latitude: number;
  longitude: number;
  inaccuracyRadius: number;
  method: string;
  dateTime: Date;
  parkId: number;
  parkAbbreviation: string;
  createdAt: Date;
}

export interface ParkNote {
  note: string;
  parkAbbreviation: string;
  updatedAt: Date;
}

export interface BucketListCompletion {
  id: number;
  bucketListItemId: number;
  updatedAt: Date;
}
