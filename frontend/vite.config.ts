import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
	],
	server: {
		host: "0.0.0.0",
		port: 5173,
		https: {
			key: fs.readFileSync("localhost+2-key.pem"),
			cert: fs.readFileSync("localhost+2.pem"),
		},
		cors: true,
		strictPort: true,
	},
});
