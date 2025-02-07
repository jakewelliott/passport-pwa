import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { api } from '@/lib/mock/api';

export const useUser = (userId?: string) => {
  // TODO: replace with auth state
  const uuid = userId ?? 'local_uuid_here';

  return useQuery<UserProfile, Error>({
    queryKey: ['user', uuid],
    // queryFn: () => api.getUserByID(uuid),
    queryFn: () => api.getUserByID(),
    enabled: !!uuid,
  });
};
