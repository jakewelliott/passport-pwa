import parks from './parks';
import { userStamps, userProfile } from './user';

import type { Geopoint, Park, ParkCode } from './types';

// ADAM: We should design our API to allow us to do as much on the client side as possible.
// Can't rely on the service layer if you're offline!
// For now, this will do as a mock API.

export const api = {
  // Parks
  getParks: () => parks,
  getPark: (code: ParkCode) => parks.find((park: Park) => park.code === code),

  // Users
  getUserByID: (userId: string) => userProfile,
  getUserStampsByID: (userId: string) => userStamps,

  // Stamps
  collectStamp: (userId: string, stampId: string, location: Geopoint | null) => {
    console.log(stampId, userId, location);
    console.error('Not mocked yet');
  },
};
