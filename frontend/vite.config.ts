import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: 'passport-pwa',
                short_name: 'passport-pwa',
                description: 'Digital Passport',
                theme_color: '#ffffff',
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
