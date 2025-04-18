import { dbg } from './debug';

export const ENV = {
    API_URL: import.meta.env.VITE_API_URL,
    PRODUCTION: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
} as const;

dbg('ENV', 'ENV', ENV);
