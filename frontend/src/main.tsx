import '@/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { register as registerServiceWorker } from './lib/service-worker';
import { TanstackQueryProvider } from './lib/tanstack-local-storage';
import { router } from './routes';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <TanstackQueryProvider>
            <RouterProvider router={router} />
        </TanstackQueryProvider>
    </React.StrictMode>,
);

registerServiceWorker();
