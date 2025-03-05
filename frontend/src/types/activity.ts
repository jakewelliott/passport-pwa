// type for anything that a user can create, update, or delete

export interface UserActivity {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface CollectedStamp {
  latitude: number;
  longitude: number;
  inaccuracyRadius: number;
  method: string;
  dateTime: Date;
  parkId: number;
  parkAbbreviation: string;
}

export interface ParkVisit {
  timestamp: Date;
  parkId: number;
  parkAbbreviation: string;
}

export interface ParkNote {
  note: string;
  parkId: number;
  parkAbbreviation: string;
}

export interface BucketListCompletion {
  id: number;
  bucketListItemId: number;
  updatedAt: Date;
}
