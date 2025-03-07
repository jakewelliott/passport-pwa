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
import { postUserContent, selectById, selectByUser } from '.';
import { Get as GetPark } from './locations_controller';
import { bucketListItems, collectedStamps, completedBucketListItems, parkVisits } from './tables/index';

// helper function
const postWithPark = <T>(abbreviation: string, req: T) => {
  const park = GetPark(abbreviation);
  return {
    ...postUserContent(req),
    parkAbbreviation: abbreviation,
    parkId: park.id,
  };
};

//
// GET ENDPOINTS
//

export const mGetCollectedStamps = () => selectByUser(collectedStamps);

export const mGetBucketListItems = () => bucketListItems;

export const mGetCompletedBucketListItems = () => selectByUser(completedBucketListItems);

export const mGetVisitedParks = () => selectByUser(parkVisits);

//
// POST ENDPOINTS
//

export const mPostCollectStamp = (param: string, req: CollectStampRequest): CollectStampResponse =>
  postWithPark(param, req);

export const mPostCreateUpdateNote = (param: string, req: ParkNoteRequest): ParkNoteResponse =>
  postWithPark(param, req);

export const mPostVisitPark = (parkAbbreviation: string, req: VisitParkRequest): VisitParkResponse =>
  postWithPark(parkAbbreviation, req);

export const mPostToggleBucketListItemCompletion = (
  itemId: number,
  req: ToggleBucketListItemCompletionRequest,
): ToggleBucketListItemCompletionResponse => {
  const item = selectById(bucketListItems, itemId);
  return postUserContent({ ...req, bucketListItemId: item.id });
};
