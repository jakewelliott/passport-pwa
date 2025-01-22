import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "prompt",
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "ncdpr-passport",
				short_name: "passport",
				description: "A passport for North Carolina State Parks",
				theme_color: "#ffffff",
			},

			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				runtimeCaching: [
					{
						urlPattern: /\/offline-test/,
						handler: "StaleWhileRevalidate",
					},
				],
			},

			devOptions: {
				enabled: false,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
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
