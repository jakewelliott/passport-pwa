import parks from './parks';
import { userStamps, userProfile } from './user';

import type { Geopoint, Park, ParkAbbreviation } from './types';

// ADAM: We should design our API to allow us to do as much on the client side as possible.
// Can't rely on the service layer if you're offline!
// For now, this will do as a mock API.

export const api = {
  // Parks
  getParks: () => parks,

  // biome-ignore lint/style/noNonNullAssertion: dangerous but we r just mocking
  getPark: (code: ParkAbbreviation) => parks.find((park: Park) => park.abbreviation === code)!,

  // Users
  getUserByID: (userId: string) => userProfile,
  getUserStampsByID: (userId: string) => userStamps,

  // Stamps
  collectStamp: (userId: string, stampId: string, location: Geopoint | null) => {
    console.error('Not mocked yet', userId, stampId, location);
  },
};
