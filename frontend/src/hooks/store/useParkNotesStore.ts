import type { ParkAbbreviation } from '@/lib/mock/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ParkNoteKey = ParkAbbreviation | 'generalNotes';
const EMPTY_NOTES = { generalNotes: '' };

interface NotesStore {
  notes: Record<ParkNoteKey, string>;
  setNote: (key: ParkNoteKey, value: string) => void;
  getKeys: () => ParkNoteKey[];
  getNote: (key: ParkNoteKey) => string | undefined;
  removeNote: (key: ParkNoteKey) => void;
  clearNotes: () => void;
}

export const useParkNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: EMPTY_NOTES,

      setNote: (key, value) => {
        set((state) => ({ notes: { ...state.notes, [key]: value } }));
      },

      getNote: (key) => {
        return get().notes[key];
      },

      getKeys: () => {
        return Object.keys(get().notes) as ParkNoteKey[];
      },

      removeNote: (key) => {
        // @ts-ignore zustand
        set((state) => {
          const { [key]: _, ...rest } = state.notes;
          return { notes: rest };
        });
      },

      clearNotes: () => {
        set({ notes: EMPTY_NOTES });
      },
    }),
    {
      name: 'park-notes',
    },
  ),
);
