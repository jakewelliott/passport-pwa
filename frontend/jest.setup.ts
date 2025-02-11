import '@testing-library/jest-dom';
import { jest, beforeAll, afterAll } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'node:util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Suppress console errors during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
