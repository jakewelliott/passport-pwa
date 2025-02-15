import type { ParkActivity } from './types';
import parksJson from './parks.json';
import dummyMapper from '../dummy-mapper';

const dummyActivity: ParkActivity = {
    completedBucketListItems: [],
    stampCollectedAt: '',
    privateNote: {
      id: 0,
      note: ''
    },
    lastVisited: ''
  }
  export default parksJson.map(dummyMapper<ParkActivity>(dummyActivity));