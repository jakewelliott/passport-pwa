export interface Geopoint {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface CollectedStamp {
  id: number;
  parkAbbreviation: string;
  createdAt: Date;
  method: string;
}

export interface UserParkVisit {
  abbreviation: string;
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
  bucketListItems: { task: string }[]; // i think we should drop this as a field on backend and just combine them on the client
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

export interface ParkNote {
  id: number;
  userId: number;
  parkAbbreviation: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO: add soft deletes
}

export interface BucketListActivity {
  id: number;
  parkId: number;
  task: string;
}

export interface BucketListCompletion {
  // A record that links a user to a bucket list activity with completion metadata
  id: number; // composite key (id, userId)
  userId: number;
  completedAt: Date;
  deleted: boolean; // For soft deletes
}

// Frontend-only type for displaying bucket list items with their completion status
export interface BucketListItem extends BucketListActivity {
  // Completion status - these will be undefined if the item is not completed by the current user
  completionId?: number; // ID of the completion record
  completedAt?: Date; // When the item was completed
  deleted?: boolean; // If the completion was soft-deleted
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
  boundaries: string;
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
