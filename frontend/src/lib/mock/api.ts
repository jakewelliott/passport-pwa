import parks from './parks';
import { userProfile } from './user';

import type { Geopoint, Park } from './types';

// ADAM: We should design our API to allow us to do as much on the client side as possible.
// Can't rely on the service layer if you're offline!
// For now, this will do as a mock API.

export const api = {
  // ADAM: don't add anything here, it's just holding up the tests
  // but should really be replaced by JSON served on the backend

  // Parks
  getParks: () => parks,
  getPark: (abbreviation: string) => parks.find((park: Park) => park.abbreviation === abbreviation),

  // Users
  getUserByID: (userId: number) => {
    console.log(userId);
    return userProfile;
  },

  // Stamps
  collectStamp: (userId: string, stampId: string, location: Geopoint | null) => {
    console.error('Not mocked yet', userId, stampId, location);
  },
};
