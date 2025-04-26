import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, type MemoryRouterProps } from 'react-router';
import { expect, vi } from 'vitest';
import { dbg } from '../debug';

interface TestEnvOptions {
    client?: QueryClient;
    routerProps?: MemoryRouterProps;
    usingBrowserRouter?: boolean;
}

const createQueryProvider = (client?: QueryClient) => {
    const queryClient =
        client ??
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    gcTime: Infinity,
                    staleTime: Infinity,
                },
            },
        });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createTestWrapper = (options?: TestEnvOptions) => {
    const { client, routerProps, usingBrowserRouter } = options ?? {};

    const QueryWrapper = createQueryProvider(client);
    const Router = ({ children }: { children: React.ReactNode }) =>
        usingBrowserRouter ? (
            <BrowserRouter>{children}</BrowserRouter>
        ) : (
            <MemoryRouter {...routerProps}>{children}</MemoryRouter>
        );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryWrapper>
            <Router>{children}</Router>
        </QueryWrapper>
    );

    const renderInWrapper = (ui: React.ReactElement) => render(ui, { wrapper });

    return { wrapper, render: renderInWrapper };
};

// export const renderWithClient = (
//     ui: React.ReactElement,
//     options?: {
//         routerProps?: {
//             initialEntries?: string[];
//         };
//     },
//     overrideQueryClient?: QueryClient,
// ) => {
//     const QCP = createQueryProvider(overrideQueryClient);

//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//         <QCP>
//             {options?.routerProps?.initialEntries ? (
//                 <MemoryRouter initialEntries={options.routerProps.initialEntries}>{ui}</MemoryRouter>
//             ) : (
//                 <BrowserRouter>{children}</BrowserRouter>
//             )}
//         </QCP>
//     );

//     const { rerender, ...result } = render(ui, { wrapper });

//     return {
//         ...result,
//         wrapper,
//         rerender: (rerenderUi: React.ReactElement) => rerender(rerenderUi),
//     };
// };

export const setupTestEnv = (options?: TestEnvOptions) => {
    const { wrapper, render } = createTestWrapper(options);

    const checkHook = async (hook: any, name: string, params?: any) => {
        dbg('TEST', `CHECKING ${name}`, params);
        const { result } = renderHook(() => hook(params), { wrapper });
        await waitFor(() => {
            console.log('result', result.current.error);
            expect(result.current.data).toBeDefined();
            expect(result.current.isLoading).toBe(false);
        });
        dbg('TEST', `LOADED ${name}`, result.current.data.length ?? result.current.data ?? 'undefined');
    };

    return {
        wrapper,
        render,
        checkHook,
    };
};

export const mockToast = () => {
    vi.mock('react-toastify', () => ({
        toast: {
            error: vi.fn(),
            success: vi.fn(),
            info: vi.fn(),
            warning: vi.fn(),
        },
    }));
};

// export const mockUseBlocker = () => {
//     vi.mock('react-router', () => ({
//         useBlocker: vi.fn().mockReturnValue({
//             state: 'blocked',
//             proceed: vi.fn(),
//             reset: vi.fn(),
//         }),
//     }));
// };
