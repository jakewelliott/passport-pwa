// This file exports singular rows from the tables
// it's used when testing dumb components that have
// state passed in as props and don't call any hooks

import { bucketListItems, collectedStamps, parkNotes, parkVisits, parks, trails, users } from './tables';

export const mockBucketListItem = bucketListItems[0];
export const mockStamp = collectedStamps[0];
export const mockPark = parks[0];
export const mockParkNote = parkNotes[0];
export const mockParkVisit = parkVisits[0];
export const mockTrail = trails[0];
export const mockUserProfile = users[1];
