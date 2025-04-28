import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { dbg } from './debug';

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: Infinity,
            retry: (failureCount, error: Error) => {
                // Don't retry on 401 errors
                if (error.message.includes('Unauthorized')) return false;
                dbg('QUERY', 'ERROR', error);
                return failureCount < 3;
            },
        },
    },
});

/**
 * Tanstack Query Provider
 *
 * Provides a Tanstack Query client to the app which is persisted to local storage
 *
 * @param {React.ReactNode} children - The children to render
 */
export const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        {children}
    </PersistQueryClientProvider>
);

// Configure persistence
// persistQueryClient({
//     queryClient,
//     persister,
//     maxAge: Infinity,
// });

export { queryClient };
