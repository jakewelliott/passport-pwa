import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { dbg } from './debug';

// Create a wrapper for IndexedDB that implements the sync interface
const storage = {
  getItem: (key: string): string | null => {
    const value = localStorage.getItem(key);
		dbg('STORAGE', 'GET', key);
    // dbg('STORAGE', 'GET', [key, value]);  // this spams the terminal
    return value;
  },
  setItem: (key: string, value: string): void => {
    localStorage.setItem(key, value);
		dbg('STORAGE', 'SET', key);
    // dbg('STORAGE', 'SET', [key, value]); // this spams the terminal
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
		dbg('STORAGE', 'REMOVE', key);
    // dbg('STORAGE', 'REMOVE', [key]); // this spams the terminal
  },
};

// Create the persister
const persister = createSyncStoragePersister({
  storage,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: (failureCount, error: Error) => {
        // Don't retry on 401 errors
        if (error.message === 'Unauthorized: Please log in again') {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

// Configure persistence
persistQueryClient({
  queryClient,
  persister,
  // Persist data for 30 days
  maxAge: 1000 * 60 * 60 * 24 * 30,
});
