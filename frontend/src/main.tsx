import '@/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { register as registerServiceWorker } from './lib/service-worker.ts';
import { queryClient } from './lib/tanstack-local-storage.ts';
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
				<ToastContainer
				position="bottom-right"
				theme="colored"
				closeOnClick
				draggable
				style={{ zIndex: 9999 }}
			/>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
);

registerServiceWorker();
