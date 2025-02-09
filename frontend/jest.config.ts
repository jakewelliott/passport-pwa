export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		// Handle module aliases
		"^@/(.*)$": "<rootDir>/src/$1",
		// Handle CSS imports (with CSS modules)
		"\\.css$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"jest.config.ts",
		"jest.setup.ts",
		".*.mock.ts",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
