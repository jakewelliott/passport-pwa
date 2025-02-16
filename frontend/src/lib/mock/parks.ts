import type { Park } from './types';
import parksJson from './parks.json';
import dummyMapper from '../dummy-mapper';

const dummy: Park = {
  abbreviation: 'DUMM',
  parkName: 'Foobar Park',
  addresses: [
    {
      title: 'Main address',
      addressLineOne: 'Foobar Street',
      addressLineTwo: 'Foobar Street',
      city: 'Foobarville',
      state: 'Foobaria',
      zipcode: 12345,
    },
  ],
  coordinates: {
    latitude: 10,
    longitude: 10,
  },
  phone: 1234567890,
  icons: [],
  photos: [],
  id: 0,
  email: 'jake@jakewelliott.com',
  establishedYear: '',
  landmark: '',
  youCanFind: '',
  trails: '',
  website: 'jakewelliott.com',
  bucketListItems: []
};

export default parksJson.map(dummyMapper<Park>(dummy));