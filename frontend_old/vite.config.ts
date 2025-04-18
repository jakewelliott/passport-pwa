import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isProduction = command === 'build';
    const pemDirectory = isProduction ? '.' : '..';
    const env = loadEnv(mode, `${process.cwd()}/${pemDirectory}`, '');
    return {
        plugins: [react()],
        define: {
            'process.env': env,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5174,
            https: {
                key: fs.readFileSync(path.join(pemDirectory, 'localhost+2-key.pem')),
                cert: fs.readFileSync(path.join(pemDirectory, 'localhost+2.pem')),
            },
            cors: true,
            strictPort: true,
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/lib/testing/vitest-setup.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                exclude: [
                    'node_modules/',
                    'src/App.tsx',
                    'src/main.tsx',
                    'src/routes.tsx',
                    'src/lib/**',
                    'src/hooks/auth/**',
                    'src/hooks/useLocation.ts',
                    'src/components/edit-**',
                    'src/components/bucket-**',
                    'src/components/sort-filter.tsx',
                    'src/components/form-field.tsx',
                    'src/components/header-menu-button.tsx',
                ],
            },
            include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        },
    };
});
