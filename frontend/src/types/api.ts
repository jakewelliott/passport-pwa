import type { EmptyBody } from './misc';
import type {
    BucketListCompletion,
    BucketListItem,
    CollectedStamp,
    Park,
    ParkGeoData,
    ParkNote,
    ParkVisit,
} from './tables';

// get requests will never specify a user id, created at, updated at, or deleted field
type GetRequest<T> = Omit<T, 'userId' | 'createdAt' | 'updatedAt' | 'deleted'>;

// post requests will never specify an id
type PostRequest<T> = Omit<GetRequest<T>, 'id'>;

// get responses will never return a location field
type GetResponse<T> = Omit<T, 'location'>;

// post responses are the same as get responses
type PostResponse<T> = GetResponse<T>;

// helper for making requests that have a park abbreviation as a parameter
type PP<T> = Omit<T, 'parkId' | 'parkAbbreviation'>;

// helper for making requests that have a bucket list item id as a parameter
type BP<T> = Omit<T, 'bucketListItemId'>;

/*---------------|
| AuthController |
|---------------*/

export interface LoginResponse {
    token: string;
}

// TODO: finish

/*--------------------|
| LocationsController |
|--------------------*/

//
// GET
//

// gets details about a specific park
export type GetParkRequest = EmptyBody;
export type GetParkResponse = GetResponse<Park>;

// gets a list of all the parks
export type GetParksRequest = EmptyBody;
export type GetParksResponse = GetResponse<Park[]>;

// gets the geo data for all the parks
export type GetParkGeoDataRequest = EmptyBody;
export type GetParkGeoDataResponse = GetResponse<ParkGeoData[]>;

// POST

// uploads a geo json file to the database
export type UploadGeoJsonRequest = EmptyBody;
export type UploadGeoJsonResponse = GetResponse<ParkGeoData>;

/*--------------------|
| ActivityController  |
|--------------------*/

//
// GET
//

// gets a list of all the parks the user has visited
export type ParkVisitRequest = EmptyBody;
export type ParkVisitResponse = GetResponse<ParkVisit[]>;

// gets a list of all the bucket list items in the passport
export type BucketListItemRequest = EmptyBody;
export type BucketListItemResponse = GetResponse<BucketListItem[]>;

// gets a list of all the bucket list items the user has completed
export type CompletedBucketListItemRequest = EmptyBody;
export type CompletedBucketListItemResponse = GetResponse<BucketListCompletion[]>;

// gets a list of all the stamps the user has collected
export type CollectedStampRequest = EmptyBody;
export type CollectedStampResponse = GetResponse<CollectedStamp[]>;

//
// POST
//

// creates a record of a park visit
export type VisitParkRequest = PostRequest<PP<ParkVisit>>;
export type VisitParkResponse = PostResponse<ParkVisit>;

// toggles the completion of a bucket list item
export type ToggleBucketListItemCompletionRequest = PostRequest<BP<BucketListCompletion>>;
export type ToggleBucketListItemCompletionResponse = PostResponse<BucketListCompletion>;

// creates a record of a stamp collection
export type CollectStampRequest = PostRequest<CollectedStamp>;
export type CollectStampResponse = PostResponse<CollectedStamp>;

// creates a note for a park
export type ParkNoteRequest = PostRequest<PP<ParkNote>>;
export type ParkNoteResponse = PostResponse<ParkNote>;
