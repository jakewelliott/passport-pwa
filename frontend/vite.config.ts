import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
/// <reference types="vitest/config" />
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
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/lib/testing/vitest-setup.ts',
        coverage: {
            enabled: true,
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            reportOnFailure: true,
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'src/lib/testing/**',
                '**/*.test.{ts,tsx}',
                'src/hooks/auth/**',
                'src/app/admin/**',
                'src/lib/cache/**',
                'src/routes.tsx',
                'src/App.tsx',
                'src/main.tsx',
                'src/hooks/queries/useAdminTools.ts',
                'src/hooks/queries/useParkFavorites.ts',
                'src/hooks/queries/useVisitPark.ts',
                'src/hooks/useSplashScreen.tsx',
                'src/hooks/useParkCheck.ts',
                'src/components/**',
                'src/app/stamps/**',
                'src/app/auth/logout.tsx',
                'src/app/more/components/**',
                'src/app/more/my-notes.tsx',
                'src/app/more/my-profile.tsx',
                'src/app/more/ncdpr-info.tsx',
                'src/app/more/trails.tsx',
                'src/app/locations/**',
                // 'src/lib/fetch.ts',
                'src/lib/filtering.ts',
                'src/lib/token-helper.ts',
                'src/lib/date-helper.ts',
            ],
        },
    },
});
