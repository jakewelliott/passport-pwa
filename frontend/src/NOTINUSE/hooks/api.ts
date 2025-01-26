import type { Park, Stamp, User } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export type APIError = {
  status: number;
  message: string;
};

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw {
      status: response.status,
      message: await response.text(),
    };
  }

  return response.json();
}

export const api = {
  // Parks
  getParks: () => fetchAPI<Park[]>('/parks'),
  getPark: (id: number) => fetchAPI<Park>(`/parks/${id}`),

  // Stamps
  getStamps: (parkId: number) => fetchAPI<Stamp[]>(`/parks/${parkId}/stamps`),
  collectStamp: (parkId: number, stampId: number) =>
    fetchAPI<Stamp>(`/parks/${parkId}/stamps/${stampId}/collect`, {
      method: 'POST',
    }),

  // User
  getUser: (userId: number) => fetchAPI<User>(`/users/${userId}`),
  getUserStamps: (userId: number) => fetchAPI<Stamp[]>(`/users/${userId}/stamps`),
};
