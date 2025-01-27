import type { UserParkVisit, UserProfile } from '@/lib/mock/types';
import userStampsJson from '@/lib/mock/user_stamps.json';
import userParkVisitsJson from '@/lib/mock/user_park_visits.json';
import dummyMapper from '@/lib/dummy-mapper';

const dummyVisit: UserParkVisit = {
  code: 'DUMM',
  timestamp: new Date(),
};

export const userParkVisits = userParkVisitsJson.map(dummyMapper(dummyVisit));

const dummyProfile: UserProfile = {
  username: 'dummyuser',
  email: 'dummyuser@test.com',
  password: 'dummyuser',
  stamps: [],
  visits: [],
};

export const userStamps = userStampsJson.map(dummyMapper(dummyProfile));

export const userProfile = dummyProfile;
