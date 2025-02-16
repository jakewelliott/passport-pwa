export type ParkAbbreviation = Uppercase<string>;

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  traceId: string;
}

export interface Geopoint {
  latitude: number;
  longitude: number;
}

export interface Stamp {
  code: ParkAbbreviation;
  timestamp: Date;
  location: Geopoint; // If a user manually collects a stamp while outside of a park, the location will be where they collected the stamp.
}

export interface UserParkVisit {
  code: ParkAbbreviation;
  timestamp: Date;
}

export interface UserProfile {
  id: number;
  username: string;
  role: string;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ParkSummary {
  parkName: string;
  abbreviation: string;
  city: string;
  state: string;
}

export interface Park {
  id: number;
  parkName: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  phone: number;
  email: string;
  establishedYear: string;
  landmark: string;
  youCanFind: string;
  trails: string;
  website: string;
  addresses: Address[];
  icons: { iconName: string }[];
  bucketListItems: { task: string }[];
  photos: { photoPath: string; alt: string }[];
  abbreviation: ParkAbbreviation; // We'll keep this field
}

export interface Address {
  title: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  zipcode: number;
}

export interface ParkActivity {
  completedBucketListItems: { id: number }[];
  stampCollectedAt: string;
  privateNote: {
    id: number;
    note: string;
  };
  lastVisited: string;
}

export interface Trail {
  trailName: string;
  trailIcons: string[];
  distance: string;
  description: string;
}