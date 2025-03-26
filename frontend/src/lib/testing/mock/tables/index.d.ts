import type {
    BucketListCompletion,
    BucketListItem,
    CollectedStamp,
    Park,
    ParkNote,
    ParkVisit,
    Trail,
    UserProfile,
} from '@/types';

// this file is the types for the data in the json files
// it tells typescript what the data looks like
// we need it since map.js has no types

export declare const bucketListItems: BucketListItem[];
export declare const collectedStamps: CollectedStamp[];
export declare const completedBucketListItems: BucketListCompletion[];
export declare const parkNotes: ParkNote[];
export declare const parks: Park[];
export declare const parkVisits: ParkVisit[];
export declare const trails: Trail[];
export declare const users: UserProfile[];
