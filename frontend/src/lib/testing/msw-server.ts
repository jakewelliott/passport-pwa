import type {
  CollectStampRequest,
  ParkNoteRequest,
  ToggleBucketListItemCompletionRequest,
  VisitParkRequest,
} from '@/types';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  GetAllParks,
  GetBucketListItems,
  GetCollectedStamps,
  GetCompletedBucketListItems,
  GetPark,
  GetUser,
  GetVisitedParks,
  Login,
  PostCollectStamp,
  PostCreateUpdateNote,
  PostToggleBucketListItemCompletion,
  PostVisitPark,
  Register,
} from './mock';

const abbreviationHelper = (params: any) => {
  const { parkAbbreviation } = params;
  if (!parkAbbreviation || typeof parkAbbreviation !== 'string') throw new Error('Park abbreviation is required');
  return parkAbbreviation;
};

const authHandlers = [
  // @ts-ignore
  http.get('*/api/auth/:userId', ({ params }) => {
    return HttpResponse.json(GetUser());
  }),

  http.post('*/api/auth/register', async ({ request }) => {
    // @ts-ignore
    const body = await request.json();
    return HttpResponse.json(Register());
  }),

  http.post('*/api/auth/login', async ({ request }) => {
    // @ts-ignore
    const body = await request.json();
    return HttpResponse.json(Login());
  }),
];

const locationsHandlers = [
  http.get('*/api/locations', () => HttpResponse.json(GetAllParks())),

  http.get('*/api/locations/:parkAbbreviation', ({ params }) => {
    return HttpResponse.json(GetPark(abbreviationHelper(params)));
  }),

  // TODO: add uploadGeoJson
  // TODO: add GetGeoData
];

const activityHandlers = [
  http.get('*/api/activity/stamps/collected', () => {
    return HttpResponse.json(GetCollectedStamps());
  }),

  http.post('*/api/activity/stamps/:parkAbbreviation', async ({ params, request }) => {
    const body = (await request.json()) as CollectStampRequest;
    return HttpResponse.json(PostCollectStamp(abbreviationHelper(params), body));
  }),

  http.post('*/api/activity/notes/:parkAbbreviation', async ({ params, request }) => {
    const p = abbreviationHelper(params);
    const body = (await request.json()) as ParkNoteRequest;
    return HttpResponse.json(PostCreateUpdateNote(p, body));
  }),

  http.get('*/api/activity/bucketlist', () => {
    return HttpResponse.json(GetBucketListItems());
  }),

  http.get('*/api/activity/bucketlist/completed', () => {
    return HttpResponse.json(GetCompletedBucketListItems());
  }),

  http.post('*/api/activity/bucketlist/:itemId', async ({ params, request }) => {
    const p = Number(params.itemId);
    const body = (await request.json()) as ToggleBucketListItemCompletionRequest;
    return HttpResponse.json(PostToggleBucketListItemCompletion(p, body));
  }),

  http.get('*/api/activity/visit', () => {
    return HttpResponse.json(GetVisitedParks());
  }),

  http.post('*/api/activity/visit/:parkAbbreviation', async ({ params, request }) => {
    const p = abbreviationHelper(params);
    const body = (await request.json()) as VisitParkRequest;
    return HttpResponse.json(PostVisitPark(p, body));
  }),
];

export const server = setupServer(...([...locationsHandlers, ...activityHandlers, ...authHandlers] as any));
