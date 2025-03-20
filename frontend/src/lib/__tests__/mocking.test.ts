import { describe, expect, it } from 'vitest';
import * as tables from '../testing/mock/tables';
describe('Mocking', () => {
  it('should load all tables correctly', () => {
    for (const table of Object.values(tables)) {
      console.log('table', table);
      expect(table).toBeDefined();
      expect(table.length).toBeGreaterThan(0);
      expect(table[0]).toBeDefined();
      expect(table[0].id).toBeDefined();
    }
  });
});
