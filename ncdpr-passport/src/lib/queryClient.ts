import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { del, get, set } from "idb-keyval";

// Create a wrapper for IndexedDB that implements the sync interface
const storage = {
	getItem: (key: string): string | null => {
		const value = localStorage.getItem(key);
		return value;
	},
	setItem: (key: string, value: string): void => {
		localStorage.setItem(key, value);
	},
	removeItem: (key: string): void => {
		localStorage.removeItem(key);
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
			retry: 2,
		},
	},
});

// Configure persistence
persistQueryClient({
	queryClient,
	persister,
	// Persist data for 24 hours
	maxAge: 1000 * 60 * 60 * 24,
});
