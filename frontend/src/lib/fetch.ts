import { dbg } from '@/lib/debug';
import Cookies from 'js-cookie';

const API_PORT = process.env.NGINX_PORT;
export const API_URL = `https://localhost:${API_PORT}/api`;

// auth
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register/`;

// user data
export const API_USER_URL = `${API_URL}/user`;
export const API_STAMPS_URL = `${API_URL}/activity/stamps`;
export const API_COLLECTED_STAMPS_URL = `${API_URL}/activity/stamps/collected`;
export const API_ACTIVITY_URL = `${API_URL}/activity/park`;

// public data
export const API_PARKS_URL = `${API_URL}/locations`;
export const API_PARKGEO_URL = `${API_URL}/locations/geo`;

const getAuthHeaders = (): Record<string, string> => {
  const token = Cookies.get('token');
  console.log('token', token);
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

  dbg('FETCH', 'POST RESPONSE', { response });
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
  dbg('FETCH', 'GET DATA', { data });

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

  dbg('FETCH', 'PUT RESPONSE', { response });
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
