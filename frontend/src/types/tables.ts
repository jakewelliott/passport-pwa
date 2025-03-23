import type { Address, Geopoint, IconEmun } from './misc';

//
// Types for tables in the database
//

export interface UserProfile {
  id: number;
  username: string;
  role: string;
  token?: string;
}

// anything a user can POST, the database auto fills these fields
interface UserContent {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean; // TODO: should this be a nullable date instead?
}

interface ParkContent extends UserContent {
  parkId: number;
}

export interface ParkIcon {
  id: number;
  icon: IconEmun;
  createdAt: Date;
  updatedAt: Date;
  parkId: number;
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
  icons: ParkIcon[];
  // bucketListItems: { id: number; task: string }[];
  photos: { photoPath: string; alt: string }[];
  abbreviation: string;
}

export interface Trail {
  id: number;
  trailName: string;
  trailIcons: ParkIcon[];
  distance: string;
  description: string;
}

export interface ParkGeoData {
  // TODO: I'm not sure how this is store
  // or if it's for trails too, but we should probably
  // be more clear
  id: number;
  coordinates: Geopoint;
  boundaries: string;
}

export interface BucketListItem {
  id: number;
  parkId: number | null;
  task: string;
}

export interface ParkVisit extends ParkContent {
  location: Geopoint;
}

export interface CollectedStamp extends ParkVisit {
  // TODO: this should really just be a string for the method
  // since we can always associate the stamp with the visit
  // even if the stamp is collected manually, you have to be at a park to collect it
  // or should it? what happens if we are offline and CollectedStamp is created before ParkVisit?
  method: string;
  timestamp: Date; // this is a field because if we are offline we want to save the date time
}

export interface ParkNote extends ParkContent {
  note: string;
  updatedAt: Date;
}

export interface BucketListCompletion extends UserContent {
  bucketListItemId: number;
  timestamp: Date; // this is a field because if we are offline we want to save the date time
}
