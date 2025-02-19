import dummyMapper from '../dummy-mapper';
import parksJson from './parks.json';
import type { ParkActivity } from './types';

const dummyActivity: ParkActivity = {
  completedBucketListItems: [],
  stampCollectedAt: '',
  privateNote: {
    id: 0,
    note: '',
  },
  lastVisited: '',
};
export default parksJson.map(dummyMapper<ParkActivity>(dummyActivity));
