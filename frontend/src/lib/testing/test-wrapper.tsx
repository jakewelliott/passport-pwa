import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

export function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Turn off retries and make queries stale immediately for testing
				retry: false,
				gcTime: Infinity,
				staleTime: Infinity,
			},
		},
	});
}

interface RenderOptions {
	routerProps?: {
		initialEntries?: string[];
	};
}

export function renderWithClient(ui: React.ReactElement, options: RenderOptions = {}) {
	const testQueryClient = createTestQueryClient();

	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>
			{options.routerProps?.initialEntries ? (
				<MemoryRouter initialEntries={options.routerProps.initialEntries}>{ui}</MemoryRouter>
			) : (
				<BrowserRouter>{ui}</BrowserRouter>
			)}
		</QueryClientProvider>,
	);

	return {
		...result,
		rerender: (rerenderUi: React.ReactElement) =>
			rerender(
				<QueryClientProvider client={testQueryClient}>
					{options.routerProps?.initialEntries ? (
						<MemoryRouter initialEntries={options.routerProps.initialEntries}>{rerenderUi}</MemoryRouter>
					) : (
						<BrowserRouter>{rerenderUi}</BrowserRouter>
					)}
				</QueryClientProvider>,
			),
	};
}

// For cases where you need a QueryClient instance in your test
export function createWrapper() {
	const testQueryClient = createTestQueryClient();
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={testQueryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	);
}
