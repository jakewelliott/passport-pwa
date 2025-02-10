export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
	  "^@/(.*)$": "<rootDir>/src/$1",
	  "\\.css$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	transform: {
	  "^.+\\.tsx?$": "ts-jest",
	},
	collectCoverage: true,
	collectCoverageFrom: [
	  "**/*.{ts,tsx}", // Include all TypeScript files
	  "!**/node_modules/**", // Exclude dependencies
	  "!**/vendor/**", // Exclude vendor files
	  "!**/*.mock.ts", // Exclude mock files
	  "!jest.config.ts", // Exclude Jest configuration file
	  "!jest.setup.ts", // Exclude Jest setup file
	],
	coveragePathIgnorePatterns: [
	  "/node_modules/",
	  "jest.config.ts",
	  "jest.setup.ts",
	  ".*.mock.ts",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	coverageReporters: ["lcov", "text", "text-summary", "xml"], // Add this line
	coverageDirectory: "./coverage", // Add this line
  };
  