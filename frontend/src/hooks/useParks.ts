import { useQuery } from '@tanstack/react-query';
import type { Park } from './types';
import { api, type APIError } from './api';

export const parkKeys = {
  all: ['parks'] as const,
  lists: () => [...parkKeys.all, 'list'] as const,
  detail: (id: number) => [...parkKeys.all, 'detail', id] as const,
};

export const useParks = () => {
  return useQuery<Park[], APIError>({
    queryKey: parkKeys.lists(),
    queryFn: () => api.getParks(),
  });
};

export const usePark = (id: number) => {
  return useQuery<Park, APIError>({
    queryKey: parkKeys.detail(id),
    queryFn: () => api.getPark(id),
    enabled: !!id,
  });
};
