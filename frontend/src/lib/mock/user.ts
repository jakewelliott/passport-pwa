import type { UserParkVisit, UserProfile, Stamp } from '@/lib/mock/types';
import userStampsJson from '@/lib/mock/user_stamps.json';
import userParkVisitsJson from '@/lib/mock/user_park_visits.json';
import dummyMapper from '@/lib/dummy-mapper';

const dummyVisit: UserParkVisit = {
  code: 'CABE',
  timestamp: new Date(),
};

export const userParkVisits = userParkVisitsJson.map(dummyMapper(dummyVisit));

const dummyProfile: UserProfile = {
  username: 'dummyuser',
  role: 'visitor',
  id: 0,
};

const dummyStamp: Stamp = {
  code: 'CABE',
  timestamp: new Date(),
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const userStamps = userStampsJson.map(dummyMapper(dummyStamp));

export const userProfile = dummyProfile;
