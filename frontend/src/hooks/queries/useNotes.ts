import { dbg } from '@/lib/debug';
import { API_ACTIVITY_URL, fetchGet, fetchPut } from '@/lib/fetch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Note {
  id: number;
  note: string;
}

export const useNote = (parkId: number) => {
  dbg('HOOK', 'useNote', parkId);

  return useQuery<Note>({
    queryKey: ['note', parkId],
    queryFn: () => fetchGet(`${API_ACTIVITY_URL}/${parkId}`),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parkId, note }: { parkId: number; note: string }) => fetchPut(`${API_ACTIVITY_URL}/${parkId}`, note),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['note', variables.parkId], data);
    },
  });
};
