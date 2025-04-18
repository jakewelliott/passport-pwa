import { describe, expect, it } from 'vitest';
import * as tables from '../testing/mock/tables';

describe('Mocking', () => {
    it('should load all tables correctly', () => {
        for (const table of Object.values(tables)) {
            expect(table).toBeDefined();
            expect(table.length).toBeGreaterThan(0);
            expect(table[0]).toBeDefined();
            expect(table[0].id).toBeDefined();
        }
    });

    it('should combine parks with some icons', () => {
        const parks = tables.parks;
        for (const park of parks) {
            expect(park.icons.length).toBeGreaterThan(0);
        }
    });

    it('should combine trails with some icons', () => {
        const trails = tables.trails;
        for (const trail of trails) {
            expect(trail.icons.length).toBeGreaterThan(0);
        }
    });
});
