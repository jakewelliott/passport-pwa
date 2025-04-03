import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

export type TestableQueryHook<T> = (...args: any[]) => {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: T | undefined;
    error: unknown;
};

/**
 * Generic test utility for testing query hooks
 * @param useQueryHook - The query hook to test
 * @param mockData - The mock data to compare against
 * @param hookParams - Optional parameters to pass to the hook
 */
export const testQueryHook = async <T extends { id: number } | { id: number }[]>(
    useQueryHook: TestableQueryHook<T>,
    mockData: T,
    hookParams: any[] = [],
) => {
    const { wrapper } = setupTestEnv();

    const { result } = renderHook(() => useQueryHook(...hookParams), { wrapper });

    // Wait for the data to be loaded
    await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
    });

    // Check for any errors
    expect(result.current.isError).toBeFalsy();

    // Check successful data fetch
    expect(result.current.isSuccess).toBeTruthy();

    // Check for the correct data
    expect(result.current.data).toBeDefined();

    if (Array.isArray(mockData) && Array.isArray(result.current.data)) {
        // Array data
        expect(result.current.data.length).toBe(mockData.length);

        // Check each item by ID
        result.current.data.forEach((item, index) => {
            expect(item.id).toBe(mockData[index].id);
        });
    } else {
        // Single item data
        expect(result.current.data).toBeDefined();
        expect((result.current.data as any).id).toBe((mockData as any).id);
    }

    return result.current;
};
