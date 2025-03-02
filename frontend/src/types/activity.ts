import type { Geopoint } from './misc';

// type for anything that a user can create, update, or delete
interface UserActivity {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

// user activity related to a park
interface ParkActivity extends UserActivity {
  parkId: number;
  parkAbbreviation: string;
}

export interface CollectedStamp extends ParkActivity {
  method: string;
  geopoint: Geopoint;
}

export interface ParkVisit extends ParkActivity {
  timestamp: Date;
}

export interface ParkNote extends ParkActivity {
  note: string;
}

export interface BucketListCompletion extends ParkActivity {
  itemId: number;
  geopoint: Geopoint;
  completed: boolean;
}
