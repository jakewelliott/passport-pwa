import dummyMapper from '@/lib/dummy-mapper';
import type { UserParkVisit, UserProfile } from '@/lib/mock/types';
import userParkVisitsJson from '@/lib/mock/user_park_visits.json';

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

export const userProfile = dummyProfile;
