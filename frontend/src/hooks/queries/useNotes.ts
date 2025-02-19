import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Note {
  id: number;
  note: string;
}

const BASE_URL = `http://localhost:${process.env.PROD === 'PROD' ? process.env.NGINX_PORT : process.env.API_DEV_PORT}/api`;

const fetchNote = async (parkId: number): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/activity/park/${parkId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.privateNote;
};

const updateNote = async (parkId: number, note: string): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/activity/park/${parkId}/note`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ note }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const useNote = (parkId: number) => {
  return useQuery<Note>({
    queryKey: ['note', parkId],
    queryFn: () => fetchNote(parkId),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parkId, note }: { parkId: number; note: string }) => updateNote(parkId, note),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['note', variables.parkId], data);
    },
  });
};
