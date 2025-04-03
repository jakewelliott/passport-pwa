import { useParkCheck } from '@/hooks/useParkCheck';
import { mockPark } from '@/lib/testing/mock/components';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { useParks, useParksGeo } from '../useParks';

vi.mock('@/hooks/useLocation', () => ({
    useLocation: () => ({
        geopoint: {
            latitude: 35.779,
            longitude: -78.638,
            inaccuracyRadius: 100,
        },
        isLoading: false,
    }),
}));

const { wrapper, checkHook } = setupTestEnv();

describe('useParkCheck', () => {
    beforeAll(async () => {
        await checkHook(useParks, 'useParks');
        // ADAM: I think parks geo endpoint needs to be mocked
        await checkHook(useParksGeo, 'useParksGeo');
    });

    it('should return the correct park', async () => {
        // we can't use testQueryHook because of useSuccess and whatnot
        const { result } = renderHook(() => useParkCheck(), { wrapper });
        expect(result.current.park).toBe(mockPark);
    });
});
