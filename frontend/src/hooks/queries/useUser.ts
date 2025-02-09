import { useMutation, useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/lib/mock/types';
import { api } from '@/lib/mock/api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    },
  });
};

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
