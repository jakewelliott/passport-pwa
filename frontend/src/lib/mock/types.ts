export interface Geopoint {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface Stamp {
  code: string;
  timestamp: Date;
  location: Geopoint; // If a user manually collects a stamp while outside of a park, the location will be where they collected the stamp.
}

export interface UserParkVisit {
  code: string;
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
  bucketListItems: { task: string }[];
  photos: { photoPath: string; alt: string }[];
  abbreviation: string;
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

export interface ParkGeoData {
  id: number;
  abbreviation: string;
  parkName: string;
  coordinates: Geopoint;
  boundaries: GeoJSON.GeometryCollection;
}

export interface CollectStampResponse {
  id: number;
  createdAt: string;
  method: string;
  parkAbbreviation: string;
}

export interface CollectStampRequest {
  latitude: number;
  longitude: number;
  inaccuracyRadius: number;
  method: string;
  dateTime: Date;
}