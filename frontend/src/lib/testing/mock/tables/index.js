import { bucket_list_items } from './bucket_list_items.json';
import { collected_stamps } from './collected_stamps.json';
import { completed_bucket_list_items } from './completed_bucket_list_items.json';
import { park_addresses } from './park_addresses.json';
import { park_icons } from './park_icons.json';
import { park_photos } from './park_photos.json';
import { park_visits } from './park_visits.json';
import { parks as parks_ } from './parks.json';
import { private_notes } from './private_notes.json';
import { trail_icons } from './trail_icons.json';
import { trails as trails_ } from './trails.json';
import { users as users_ } from './users.json';

// NOTE: this file maps the raw data in json files to the types our frontend expects
// the raw data is in snake_case and the types are in camelCase

// utility functions

const parseGeopoint = (geopoint) => {
    const [longitude, latitude] = geopoint.replace('POINT (', '').replace(')', '').split(' ').map(Number);
    return { latitude, longitude, inaccuracyRadius: 0.0001 };
};

const snakeStringToCamelCase = (str) =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()).replace(/_+$/g, '');

// this is where the magic happens

function camelify(obj, specialCases = {}) {
    const result = new Object();

    for (const key in obj) {
        // special key parsing cases go here
        if (key in specialCases) {
            result[specialCases[key]] = obj[key];
            continue;
        }

        // convert snake_case to camelCase
        const camelKey = snakeStringToCamelCase(key);

        // we need to turn string dates into Date objects
        if (camelKey === 'createdAt' || camelKey === 'updatedAt') {
            result[camelKey] = new Date(obj[key]);
            continue;
        }

        // happy path: just copy the value over to the new key
        result[camelKey] = obj[key];
    }

    return result;
}

// process the raw data

const camel = Object.entries({
    parks_,
    bucket_list_items,
    collected_stamps,
    completed_bucket_list_items,
    park_addresses,
    park_icons,
    park_photos,
    park_visits,
    private_notes,
    trail_icons,
    trails_,
    users_,
}).reduce((acc, [key, value]) => {
    // Now we map over each array and camelify each item
    acc[snakeStringToCamelCase(key)] = Array.isArray(value)
        ? value.map((item) =>
              camelify(item, {
                  // sometimes the backend keys don't match the frontend keys, even after camelifying
                  // so we need to map them here
                  park: 'parkId',
                  user: 'userId',
                  park_abbreviation: 'abbreviation',
                  length: 'distance',
              }),
          )
        : camelify(value, {
              park: 'parkId',
              user: 'userId',
              park_abbreviation: 'abbreviation',
              length: 'distance',
          });
    return acc;
}, {});

// for parks, we need to include the coordinates, addresses, icons, and photos
export const parks = camel.parks.map((park) => ({
    ...park,
    coordinates: parseGeopoint(park.coordinates),
    addresses: camel.parkAddresses.filter((address) => address.parkId === park.id),
    icons: camel.parkIcons.filter((icon) => icon.parkId === park.id),
    photos: camel.parkPhotos.filter((photo) => photo.parkId === park.id),
}));

// for trails, we need to get an array of the icon names
export const trails = camel.trails.map((trail) => ({
    ...trail,
    trailIcons: camel.trailIcons.filter((icon) => icon.trail === trail.id).map((icon) => icon.icon),
}));

// for the rest of the tables, we just need to camelify the keys
// im using camelCase in these names to make it clear that the data is in camelCase

export const bucketListItems = camel.bucketListItems;
export const collectedStamps = camel.collectedStamps;
export const completedBucketListItems = camel.completedBucketListItems;
export const parkVisits = camel.parkVisits;
export const parkNotes = camel.privateNotes;
export const users = camel.users;
