import { dbg } from '@/lib/debug';
import { API_NOTES_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { ParkNote } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useNotes = () => {
    dbg('HOOK', 'useNotes');
    return useQuery<ParkNote[]>({
        queryKey: ['notes'],
        queryFn: async () => await fetchGet(API_NOTES_URL),
    });
};

export const useNote = (parkId: number) => {
    const hook = useNotes();
    const note = hook.data?.find((note) => note.parkId === parkId);
    return { ...hook, data: note };
};

export const useUpdateNote = () => {
    const { refetch } = useNotes();
    return useMutation({
        mutationFn: ({ parkId, note }: { parkId: number; note: string }) =>
            fetchPost(`${API_NOTES_URL}/${parkId}`, { note: note, updatedAt: new Date() }),
        onSuccess: () => {
            dbg('HOOK', 'useUpdateNote', 'refetching notes...');
            refetch();
        },
    });
};
