import dummyMapper from '../dummy-mapper';
import parksJson from './parks.json';
import type { ParkActivity } from './types';

const dummyActivity: ParkActivity = {
  completedBucketListItems: [],
  stampCollectedAt: '2024-02-16T06:48:00.000Z',
  privateNote: {
    id: 0,
    note: '',
  },
  lastVisited: '',
};
export default parksJson.map(dummyMapper<ParkActivity>(dummyActivity));
