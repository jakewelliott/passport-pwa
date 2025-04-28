import '@/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { TanstackQueryProvider } from './lib/tanstack-local-storage';
import { router } from './routes';

/** App entry point, providers go here */
// biome-ignore lint/style/noNonNullAssertion: this is fine
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TanstackQueryProvider>
            <RouterProvider router={router} />
        </TanstackQueryProvider>
    </StrictMode>,
);
