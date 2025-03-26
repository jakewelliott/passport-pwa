import type { Address, Geopoint, ParkIconEnum, TrailIconEnum } from './misc';

interface DatabaseEntry {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

//
// Types for tables in the database
//

export interface UserProfile extends DatabaseEntry {
    username: string;
    role: string;
    token?: string;
}

// anything a user can POST, the database auto fills these fields
interface UserContent extends DatabaseEntry {
    userId: number;
}

interface ParkContent extends UserContent {
    parkId: number;
}

export interface ParkIcon extends DatabaseEntry {
    iconName: ParkIconEnum;
}

export interface ParkPhoto {
    photoPath: string;
    alt: string;
}

export interface Park extends DatabaseEntry {
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
    photos: ParkPhoto[];
    abbreviation: string;
}

export interface Trail extends DatabaseEntry {
    trailName: string;
    icons: TrailIconEnum[];
    distance: string;
    description: string;
}

export interface ParkGeoData extends DatabaseEntry {
    // TODO: I'm not sure how this is store
    // or if it's for trails too, but we should probably
    // be more clear
    coordinates: Geopoint;
    boundaries: string;
}

export interface BucketListItem extends DatabaseEntry {
    parkId: number | null;
    task: string;
}

export interface ParkVisit extends ParkContent {
    geopoint: Geopoint;
}

export interface CollectedStamp extends ParkVisit {
    // TODO: this should really just be a string for the method
    // since we can always associate the stamp with the visit
    // even if the stamp is collected manually, you have to be at a park to collect it
    // or should it? what happens if we are offline and CollectedStamp is created before ParkVisit?
    method: string;
    dateTime: Date;
    parkId: number;
    parkAbbreviation: string;
    createdAt: Date;
}

export interface ParkNote extends ParkContent {
    note: string;
    updatedAt: Date;
}

export interface BucketListCompletion extends UserContent {
    geopoint: Geopoint;
    bucketListItemId: number;
    timestamp: Date; // this is a field because if we are offline we want to save the date time
}
