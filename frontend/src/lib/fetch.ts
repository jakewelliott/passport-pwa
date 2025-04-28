import { dbg } from '@/lib/debug';
import Cookies from 'js-cookie';

const env = import.meta.env;

/**
 * Determine Base URL
 *
 * Determines the base URL for the API since our env vars suck
 *
 * @returns {string} The base URL
 */
const determineBaseUrl = () => {
    // When running tests (MSW intercepts requests at any URL), use a consistent base URL
    if (import.meta.env.MODE === 'test') return '';

    // when running outside of docker, we need to use HTTP port
    if (env.DEV) return `http://${env.VITE_API_HOSTNAME}:${env.VITE_API_HTTP_PORT}`;
    // if HTTPS port is set to 443, then don't include it
    if (env.VITE_API_HTTPS_PORT === '443') return `https://${env.VITE_API_HOSTNAME}`;
    if (env.VITE_API_USE_PORT === 'false') return `https://${env.VITE_API_HOSTNAME}`;
    // otherwise, include the port
    return `https://${env.VITE_API_HOSTNAME}:${env.VITE_API_HTTPS_PORT}`;
};

export const API_URL = `${determineBaseUrl()}/api`;

// auth
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register/`;

// user data
export const API_VISIT_HISTORY_URL = `${API_URL}/activity/visit`;

// stamps
export const API_STAMPS_URL = `${API_URL}/activity/stamps`;
export const API_COLLECTED_STAMPS_URL = `${API_STAMPS_URL}/collected`;

// bucket list
export const API_BUCKET_LIST_URL = `${API_URL}/activity/bucketlist`;
export const API_COMPLETED_BUCKET_LIST_ITEMS_URL = `${API_BUCKET_LIST_URL}/completed`;

// favorite parks
export const API_FAVORITE_PARKS_URL = `${API_URL}/activity/parks/favorites`;

// public data
export const API_PARKS_URL = `${API_URL}/locations`;
export const API_TRAILS_URL = `${API_URL}/locations/trails`;
export const API_PARKGEO_URL = `${API_URL}/locations/geo`;
export const API_UPLOADGEO_URL = `${API_URL}/locations/uploadGeoJson`;

// notes
export const API_NOTES_URL = `${API_URL}/activity/notes`;

const getAuthHeaders = (): Record<string, string> => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch Post
 *
 * Fetches a POST request
 *
 * @param {string} url - The URL to fetch
 */
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

/**
 * Fetch Get
 *
 * Fetches a GET request
 *
 * @param {string} url - The URL to fetch
 */
export const fetchGet = async (url: string) => {
    dbg('FETCH', 'GET', url);
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

/**
 * Fetch Put
 *
 * Fetches a PUT request
 *
 * @param {string} url - The URL to fetch
 */
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

/**
 * Fetch Delete
 *
 * Fetches a DELETE request
 *
 * @param {string} url - The URL to fetch
 */
export const fetchDelete = async (url: string) => {
    dbg('FETCH', 'DELETE', { url });
    const headers: Record<string, string> = {
        ...getAuthHeaders(),
    };

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
        credentials: 'include',
    });

    if (!response.ok) await fetchError(response);

    // dbg('FETCH', 'POST RESPONSE', { response });
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
