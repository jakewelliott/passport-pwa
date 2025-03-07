import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CollectStamp, CreateUpdateNote, GetCollectedStamps } from './api/activity_controller';
import { GetUserById, Login, Register } from './api/auth_controller';
import { Get, GetAll } from './api/locations_controller';
/*
 * This file is a mock server for the API.
 * We have to cast pretty much everything, so I decided to just use JavaScript.
 * I know, big shocker, but it's just better this way.
 */

const abbreviationHelper = async (params) => {
  const p = params.parkAbbreviation;
  if (!p) throw new Error('Park abbreviation is required');
  return p;
};

const authHandlers = [
  http.get('/api/auth/:userId', ({ params }) => {
    const p = params.userId;
    if (!p) throw new Error('User ID is required');
    return HttpResponse.json(GetUserById(p));
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(Register(body));
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(Login(body));
  }),
];

const locationsHandlers = [
  http.get('/api/locations', () => HttpResponse.json(GetAll())),

  http.get('/api/locations/:parkAbbreviation', ({ params }) => {
    const p = abbreviationHelper(params);
    return HttpResponse.json(Get(p));
  }),

  // TODO: add uploadGeoJson
  // TODO: add GetGeoData
];

const activityHandlers = [
  http.get('/api/activity/stamps/collected', () => {
    return HttpResponse.json(GetCollectedStamps());
  }),

  http.post('/api/activity/stamps/:parkAbbreviation', async ({ params, request }) => {
    const p = abbreviationHelper(params);
    const body = await request.json();
    return HttpResponse.json(CollectStamp(p, body));
  }),

  http.post('/api/activity/notes/:parkAbbreviation', async ({ params, request }) => {
    const p = abbreviationHelper(params);
    const body = await request.json();
    return HttpResponse.json(CreateUpdateNote(p, body.note));
  }),

  http.get('/api/activity/bucketlist', () => {
    return HttpResponse.json(GetBucketListItems());
  }),

  http.get('/api/activity/bucketlist/completed', () => {
    return HttpResponse.json(GetCompletedBucketListItems());
  }),

  http.post('/api/activity/bucketlist/:itemId', async ({ params, request }) => {
    const p = params.itemId; // can't use abbreviationHelper :(
    if (!p) throw new Error('Item ID is required');
    const body = await request.json();
    return HttpResponse.json(ToggleBucketListItemCompletion(p, body));
  }),

  http.get('/api/activity/visit', () => {
    return HttpResponse.json(GetVisitedParks());
  }),

  http.post('/api/activity/visit/:parkAbbreviation', async ({ params, request }) => {
    const p = abbreviationHelper(params);
    const body = await request.json();
    return HttpResponse.json(VisitPark(p, body));
  }),
];

export const server = setupServer([...locationsHandlers, ...activityHandlers, ...authHandlers]);
