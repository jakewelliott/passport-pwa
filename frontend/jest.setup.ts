import "@testing-library/jest-dom";
import { jest, beforeAll, afterAll } from "@jest/globals";

// Suppress console errors during tests
beforeAll(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
	jest.restoreAllMocks();
});
