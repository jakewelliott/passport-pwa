// type for anything that a user can create, update, or delete

export interface UserActivity {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

// user activity related to a park
export interface ParkActivity extends UserActivity {
  parkId: number;
  parkAbbreviation: string;
}

export interface CollectedStamp extends ParkActivity {
  latitude: number;
  longitude: number;
  inaccuracyRadius: number;
  method: string;
  dateTime: Date;
}

export interface ParkVisit extends ParkActivity {
  timestamp: Date;
}

export interface ParkNote extends ParkActivity {
  note: string;
}

export interface BucketListCompletion {
  id: number;
  bucketListItemId: number;
  updatedAt: Date;
}
