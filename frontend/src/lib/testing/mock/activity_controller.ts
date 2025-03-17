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
import { bucketListItems, collectedStamps, completedBucketListItems, parkVisits } from './tables/index';
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

//
// GET ENDPOINTS
//

export const GetCollectedStamps = () => selectByUser(collectedStamps);

export const GetBucketListItems = () => bucketListItems;

export const GetCompletedBucketListItems = () => selectByUser(completedBucketListItems);

export const GetVisitedParks = () => selectByUser(parkVisits);

//
// POST ENDPOINTS
//

export const PostCollectStamp = (param: string, req: CollectStampRequest): CollectStampResponse =>
  postWithPark(param, req);

export const PostCreateUpdateNote = (param: string, req: ParkNoteRequest): ParkNoteResponse => postWithPark(param, req);

export const PostVisitPark = (parkAbbreviation: string, req: VisitParkRequest): VisitParkResponse =>
  postWithPark(parkAbbreviation, req);

export const PostToggleBucketListItemCompletion = (
  itemId: number,
  req: ToggleBucketListItemCompletionRequest,
): ToggleBucketListItemCompletionResponse => {
  const item = selectById(bucketListItems, itemId);
  return postUserContent({ ...req, bucketListItemId: item.id });
};
