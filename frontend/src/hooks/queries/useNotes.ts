import { dbg } from '@/lib/debug';
import { API_NOTES_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { ParkNote } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useNote = (parkId: number) => {
  dbg('HOOK', 'useNote', parkId);

  return useQuery<ParkNote>({
    queryKey: ['notes', parkId],
    queryFn: () => fetchGet(`${API_NOTES_URL}/${parkId}`),
  });
};

export const useGetAllNotes = () => {
  dbg('HOOK', 'useGetAllNotes');

  return useQuery<ParkNote[]>({
    queryKey: ['notes'],
    queryFn: async () => await fetchGet(API_NOTES_URL),
  });
};

export const useUpdateNote = () => {
  const { refetch } = useGetAllNotes();
  return useMutation({
    mutationFn: ({ parkId, note }: { parkId: number; note: string }) =>
      fetchPost(`${API_NOTES_URL}/${parkId}`, { note: note, updatedAt: new Date() }),
    onSuccess: () => {
      dbg('HOOK', 'useUpdateNote', 'refetching all notes...');
      refetch();
    },
  });
};
