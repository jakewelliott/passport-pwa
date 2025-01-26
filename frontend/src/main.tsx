import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './NOTINUSE/lib/queryClient.ts';
import App from './App.tsx';
import { register as registerServiceWorker } from './utils/service-worker-registration.ts';
import './styles/globals.css';
import './styles/fonts.css';
import { TitleProvider } from './context/title-context.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TitleProvider>
          <App />
        </TitleProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

registerServiceWorker();
