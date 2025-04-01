import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

export const createCache = () => new QueryCache();

export const createTestQueryClient = () => {
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

export const renderWithClient = (
    ui: React.ReactElement,
    options?: RenderOptions,
    overrideQueryClient?: QueryClient,
) => {
    const queryClient = overrideQueryClient ?? createTestQueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {options?.routerProps?.initialEntries ? (
                <MemoryRouter initialEntries={options.routerProps.initialEntries}>{ui}</MemoryRouter>
            ) : (
                <BrowserRouter>{children}</BrowserRouter>
            )}
        </QueryClientProvider>
    );

    const { rerender, ...result } = render(ui, { wrapper });

    return {
        ...result,
        queryClient,
        wrapper,
        rerender: (rerenderUi: React.ReactElement) => rerender(rerenderUi),
    };
};
