import dummyMapper from '@/lib/dummy-mapper';
import type { Stamp, UserParkVisit, UserProfile } from '@/lib/mock/types';
import userParkVisitsJson from '@/lib/mock/user_park_visits.json';
import userStampsJson from '@/lib/mock/user_stamps.json';

const dummyVisit: UserParkVisit = {
  abbreviation: 'CABE',
  timestamp: new Date(),
};

export const userParkVisits = userParkVisitsJson.map(dummyMapper(dummyVisit));

const dummyProfile: UserProfile = {
  username: 'dummyuser',
  role: 'visitor',
  id: 0,
};

const dummyStamp: Stamp = {
  id: 0,
  abbreviation: 'CABE',
  method: 'manual',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 0,
  parkId: 0,
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const userStamps = userStampsJson.map(dummyMapper(dummyStamp));

export const userProfile = dummyProfile;
