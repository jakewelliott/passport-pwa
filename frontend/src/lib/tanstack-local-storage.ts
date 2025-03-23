import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { dbg } from './debug';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: (failureCount, error: Error) => {
        // Don't retry on 401 errors
        if (error.message === 'Unauthorized: Please log in again') {
          return false;
        }
        dbg('QUERY', 'ERROR', error);
        return failureCount < 3;
      },
    },
  },
});

// Create the persister
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// Configure persistence
persistQueryClient({
  queryClient,
  persister,
  maxAge: Infinity,
});

export { queryClient };
