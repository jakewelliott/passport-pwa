export type ParkCode = Uppercase<string>;
import type { TrailIconName } from '@/components/common/trail-icon';

export interface Geopoint {
  latitude: number;
  longitude: number;
}

export interface UserStamp {
  code: ParkCode;
  timestamp: Date;
  location: Geopoint | null; // If a user manually collects a stamp while outside of a park, the location will be where they collected the stamp.
}

export interface UserParkVisit {
  code: ParkCode;
  timestamp: Date;
}

export interface UserProfile {
  username: string;
  email: string;
  password: string;
  stamps: UserStamp[];
  visits: UserParkVisit[];
}

export interface Address {
  description?: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
}

export interface ParkPhoto {
  url: string;
  caption?: string;
}

export interface Park {
  code: ParkCode;
  name: string;
  city: string;
  address: Address;
  additionalAddress?: Address[];
  coordinates: Geopoint;
  phone: string;
  email?: string;
  website?: string;
  established?: string;
  landmark?: string;
  youCanFind?: string;
  trails?: unknown[];
  // TODO: model some types for icons and whatnot
  parkIcons: string[];
  parkPhotos: ParkPhoto[];
  parkNotes: string;
}

export interface Trail {
  trailName: string;
  trailIcons: TrailIconName[];
  distance: string;
  description: string;
}
