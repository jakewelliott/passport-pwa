import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ParkNoteKey = string | 'generalNotes';
type NoteData = {
  content: string;
  updatedAt: number | undefined;
};
const EMPTY_NOTES: Record<ParkNoteKey, NoteData> = { generalNotes: {content: '', updatedAt: undefined} };

interface NotesStore {
  notes: Record<ParkNoteKey, NoteData>;
  setNote: (key: ParkNoteKey, value: string, updatedAt: number) => void;
  getKeys: () => ParkNoteKey[];
  getNoteContent: (key: ParkNoteKey) => string | undefined;
  getNote: (key: ParkNoteKey) => NoteData | undefined;
  getUpdatedAt: (key: ParkNoteKey) => number | undefined;
  removeNote: (key: ParkNoteKey) => void;
  clearNotes: () => void;
}

export const useParkNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: EMPTY_NOTES,

      setNote: (key, value, updatedAt) => {
        set((state) => ({ 
          notes: { 
            ...state.notes, 
            [key]: {
              content: value,
              updatedAt: updatedAt,
            } } 
        }));
      },

      getNote: (key) => {
        return get().notes[key];
      },

      getNoteContent: (key) => {
        const note = get().notes[key];
        return note ? note.content : undefined;
      },

      getUpdatedAt: (key) => {
          const note = get().notes[key];
          return note ? note.updatedAt : undefined;
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
