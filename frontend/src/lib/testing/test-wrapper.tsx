import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

export const createCache = () => new QueryCache();

const createTestQueryClient = () => {
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
};

interface RenderOptions {
    routerProps?: {
        initialEntries?: string[];
    };
}

export const createQueryHookWrapper = () => {
    const queryClient = createTestQueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return wrapper;
};

export const renderWithClient = (ui: React.ReactElement, options: RenderOptions = {}) => {
    const testQueryClient = createTestQueryClient();

    // Mock user data
    const mockUser = { role: 'visitor' }; // Adjust the role as needed
    testQueryClient.setQueryData(['user'], { data: mockUser, isLoading: false });

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
};
