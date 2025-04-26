import { QueryCache } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { server } from './msw-server';

// Extend Vitest's expect with jest-dom matchers since they're not included by default
expect.extend(matchers);

// Make a query cache for the tests
const queryCache = new QueryCache();

// Start the mock server before all tests
beforeAll(() => {
    server.listen();
});

// Reset the mock server and clear the query cache after each test
afterEach(() => {
    cleanup();
    server.resetHandlers();
    queryCache.clear();
});

// Close the mock server after all tests
afterAll(() => {
    server.close();
});
