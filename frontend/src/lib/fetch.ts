import { DEBUG, dbg } from '@/lib/debug';
import Cookies from 'js-cookie';

const MOCK_PORT = 6969;

const API_PORT = (DEBUG ? process.env.API_DEV_PORT : process.env.NGINX_PORT) ?? MOCK_PORT;
const PROTOCOL = DEBUG ? 'http' : 'https';

export const API_URL = `${PROTOCOL}://localhost:${API_PORT}/api`;

// auth
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register/`;

// user data
export const API_USER_URL = `${API_URL}/user`;
export const API_VISIT_HISTORY_URL = `${API_URL}/activity/visit`;

// stamps
export const API_STAMPS_URL = `${API_URL}/activity/stamps`;
export const API_COLLECTED_STAMPS_URL = `${API_STAMPS_URL}/collected`;

// bucket list
export const API_BUCKET_LIST_URL = `${API_URL}/activity/bucketlist`;
export const API_COMPLETED_BUCKET_LIST_ITEMS_URL = `${API_BUCKET_LIST_URL}/completed`;

// public data
export const API_PARKS_URL = `${API_URL}/locations`;
export const API_TRAILS_URL = `${API_URL}/locations/trails`;
export const API_PARKGEO_URL = `${API_URL}/locations/geo`;

// notes
export const API_NOTES_URL = `${API_URL}/activity/notes`;

const getAuthHeaders = (): Record<string, string> => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPost = async (url: string, body: any) => {
  dbg('FETCH', 'POST', { url, body });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!response.ok) await fetchError(response);

  // dbg('FETCH', 'POST RESPONSE', { response });
  return response;
};

// TODO: add generic type arg and zod validation, throw might be tricky here
export const fetchGet = async (url: string) => {
  dbg('FETCH', 'GET', { url });
  const headers: Record<string, string> = {
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  dbg('FETCH', 'GET RESPONSE', { response });

  if (!response.ok) await fetchError(response);

  const data = await response.json();
  // dbg('FETCH', 'GET DATA', { data });

  return data;
};

export const fetchPut = async (url: string, body: any) => {
  dbg('FETCH', 'PUT', { url, body });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!response.ok) await fetchError(response);

  // dbg('FETCH', 'PUT RESPONSE', { response });
  return response;
};

const fetchError = async (response: Response) => {
  dbg('ERROR', 'FETCH', { response });
  let message = '';
  try {
    const errorData = await response.json();
    const errorMessage = errorData.detail || response.statusText;
    message = errorMessage;
  } catch (error) {
    message = response.statusText;
  }

  throw new Error(message);
};
