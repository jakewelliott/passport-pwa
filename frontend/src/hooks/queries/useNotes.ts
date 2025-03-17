import { dbg } from '@/lib/debug';
import { API_NOTES_URL, fetchGet, fetchPost } from '@/lib/fetch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Note {
  parkAbbreviation: string;
  note: string;
}

export const useNote = (parkId: number) => {
  dbg('HOOK', 'useNote', parkId);

  return useQuery<Note>({
    queryKey: ['note', parkId],
    queryFn: () => fetchGet(`${API_NOTES_URL}/${parkId}`),
  });
};

export const useGetAllNotes = () => {
  dbg('HOOK', 'useGetAllNotes');

  const { data, refetch } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => await fetchGet(API_NOTES_URL),
  });

  return { data, refetch };
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parkId, note }: { parkId: number; note: string }) =>
      fetchPost(`${API_NOTES_URL}/${parkId}`, { note: note, updatedAt: new Date() }),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['note', variables.parkId], data);
    },
  });
};
