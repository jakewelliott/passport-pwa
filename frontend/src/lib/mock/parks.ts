import type { Park } from './types';
import parksJson from './parks.json';
import dummyMapper from '../dummy-mapper';

const dummy: Park = {
  abbreviation: 'CABE',
  name: 'Foobar Park',
  city: 'Foobar City',
  address: {
    addressLineOne: 'Foobar Street',
    addressLineTwo: 'Foobar Street',
    city: 'Foobarville',
    state: 'Foobaria',
    zip: '12345',
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  phone: '(123) 456-7890',
  parkIcons: [],
  parkPhotos: [],
  parkNotes: 'Not a real park',
};

export default parksJson.map(dummyMapper(dummy));
