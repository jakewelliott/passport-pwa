import type { Park, UserStamp, UserProfile, Geopoint, ParkCode } from './types';

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
  getPark: (code: ParkCode) => fetchAPI<Park>(`/parks/${code}`),

  // Users
  getUser: (userId: string) => fetchAPI<UserProfile>(`/users/${userId}`),

  getUserStamps: (userId: string) => fetchAPI<UserStamp[]>(`/users/${userId}/stamps`),

  collectStamp: (userId: string, stampId: string, location: Geopoint | null) =>
    fetchAPI<UserStamp>(`/users/${userId}/stamps/${stampId}/collect`, {
      method: 'POST',
      body: JSON.stringify({ location }),
    }),
};
