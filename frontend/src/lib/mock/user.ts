import dummyMapper from '@/lib/dummy-mapper';
import userParkVisitsJson from '@/lib/mock/user_park_visits.json';
import type { UserParkVisit, UserProfile } from '@/types';

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

export const userProfile = dummyProfile;
