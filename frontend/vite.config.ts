import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isProduction = command === 'build';
	const pemDirectory = isProduction ? '.' : '..';
	return {
	plugins: [react()],
	define: {
		'process.env': env
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 5174,
		https: {
			key: fs.readFileSync(path.join(pemDirectory, "localhost+2-key.pem")),
			cert: fs.readFileSync(path.join(pemDirectory, "localhost+2.pem")),
		},
		cors: true,
		strictPort: true,
	},
}
});
