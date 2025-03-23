import { create } from 'zustand';

type OfflineStore = {
  offline: boolean;
  setOffline: (offline: boolean) => void;
  lastSync: Date;
  setLastSync: (lastSync: Date) => void;
};

export const useOfflineStore = create<OfflineStore>((set) => ({
  offline: false,
  setOffline: (offline) => set({ offline }),
  lastSync: new Date(),
  setLastSync: (lastSync) => set({ lastSync }),
}));
