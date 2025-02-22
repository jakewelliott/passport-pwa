import { dbg } from '@/lib/debug';
import Cookies from 'js-cookie';

// TODO: use correct port for dev, for some reason PROD wasnt working for me in docker
const API_PORT = process.env.PROD === 'PROD' ? process.env.NGINX_PORT : process.env.API_DEV_PORT;
// const API_PORT = process.env.NGINX_PORT;

export const API_URL = `http://localhost:${API_PORT}/api`;

// auth
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register/`;

// user data
export const API_USER_URL = `${API_URL}/user`;
export const API_STAMPS_URL = `${API_URL}/activity/stamps`;
export const API_ACTIVITY_URL = `${API_URL}/activity/park`;

// public data
export const API_PARKS_URL = `${API_URL}/locations`;
export const API_PARKGEO_URL = `${API_URL}/locations/geo`;

const getAuthHeaders = (): Record<string, string> => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPost = async (url: string, body: any) => {
  dbg('FETCH', 'POST', { url, body });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!response.ok) fetchError(response);

  dbg('FETCH', 'POST RESPONSE', { response });
  return response;
};

// TODO: add generic type arg and zod validation, throw might be tricky here
export const fetchGet = async (url: string) => {
  dbg('FETCH', 'GET', { url });
  const headers: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (!response.ok) fetchError(response);

  const data = await response.json();
  dbg('FETCH', 'GET RESPONSE', { response, data });

  return data;
};

const fetchError = (response: Response) => {
  dbg('ERROR', 'FETCH', { response });
  const msg = `${response.statusText}`;
  throw new Error(`FETCH failed: ${msg}`);
};
