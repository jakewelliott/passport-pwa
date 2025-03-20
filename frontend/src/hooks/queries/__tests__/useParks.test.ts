import { parks } from '@/lib/testing/mock/tables';
import { testQueryHook } from '@/lib/testing/testQueryHook';
import { describe, it } from 'vitest';
import { usePark, useParks } from '../useParks';

describe('Park Queries', () => {
  it('useParks should return all parks in database', async () => {
    await testQueryHook(useParks, parks);
  });

  it('usePark should return a single park', async () => {
    await testQueryHook(usePark, parks[0], [parks[0].abbreviation]);
  });

  // TODO: add JSON and mocking for this
  // it('useParkGeo should return the geodata for all parks', async () => {
  //   await testQueryHook(useParksGeo, parksGeo);
  // });
});
