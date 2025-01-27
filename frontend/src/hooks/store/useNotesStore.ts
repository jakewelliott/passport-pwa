import { create } from "zustand";

// ADAM:
// This is a very primitive global store pattern.
// It should be used sparingly and only for small, simple state.
// Don't use zustand for complex state or state that needs to be shared between components.

// ADAM:
// There's usually a better way to share state between components.
// For components far away on the component tree: tanstack query useQuery/useMutation
// For components close to each other: useContext
// Sometimes you can invert your data flow to share state between components.

interface NotesState {
	notes: Record<string, string>;
	setNotes: (notes: Record<string, string>) => void;
}

const useNotesStore = create<NotesState>((set) => ({
	notes: {},
	setNotes: (notes) => set({ notes }),
}));

export default useNotesStore;
