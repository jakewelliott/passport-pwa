import type {
  CollectStampRequest,
  CollectStampResponse,
  ParkNoteRequest,
  ParkNoteResponse,
  ToggleBucketListItemCompletionRequest,
  ToggleBucketListItemCompletionResponse,
  VisitParkRequest,
  VisitParkResponse,
} from '@/types';
import { GetPark } from './locations_controller';
import {
  bucketListItems,
  collectedStamps,
  completedBucketListItems,
  parkNotes,
  parkVisits,
  parks,
} from './tables/index';
import { postUserContent, selectById, selectByUser } from './utils';

// helper function
const postWithPark = <T>(abbreviation: string, req: T) => {
  const park = GetPark(abbreviation);
  return {
    ...postUserContent(req),
    parkAbbreviation: abbreviation,
    parkId: park.id,
  };
};

const postWithParkId = <T>(parkId: number, req: T) => {
  const park = selectById(parks, parkId);
  return {
    ...postUserContent(req),
    parkId: park.id,
  };
};

//
// GET ENDPOINTS
//

export const GetCollectedStamps = () => selectByUser(collectedStamps);

export const GetBucketListItems = () => bucketListItems;

export const GetCompletedBucketListItems = () => selectByUser(completedBucketListItems);

export const GetVisitedParks = () => selectByUser(parkVisits);

export const GetParkNote = (parkId: number) => {
  const note = parkNotes.find((note) => note.parkId === parkId);
  return note ? note : null;
};

export const GetAllNotes = () => selectByUser(parkNotes);

//
// POST ENDPOINTS
//

export const PostCollectStamp = (param: string, req: CollectStampRequest): CollectStampResponse =>
  postWithPark(param, req);

// TODO: map parkId 0 to null for general notes
export const PostCreateUpdateNote = (param: number, req: ParkNoteRequest): ParkNoteResponse =>
  postWithParkId(param, req);

export const PostVisitPark = (parkAbbreviation: string, req: VisitParkRequest): VisitParkResponse =>
  postWithPark(parkAbbreviation, req);

export const PostToggleBucketListItemCompletion = (
  itemId: number,
  req: ToggleBucketListItemCompletionRequest,
): ToggleBucketListItemCompletionResponse => {
  const item = selectById(bucketListItems, itemId);
  return postUserContent({ ...req, bucketListItemId: item.id });
};
