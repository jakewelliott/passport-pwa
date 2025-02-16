import { dbg } from '@/lib/debug';
import Cookies from 'js-cookie';
import { ErrorResponse } from './mock/types';

const API_PORT = process.env.PROD === 'PROD' ? process.env.NGINX_PORT : process.env.API_DEV_PORT;
export const API_URL = `http://localhost:${API_PORT}/api`;

// auth
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register/`;

// user data
export const API_USER_URL = `${API_URL}/user`;

// public data
export const API_PARKS_URL = `${API_URL}/locations`;
export const API_STAMPS_URL = `${API_URL}/stamps`;
export const API_ACTIVITY_URL = `${API_URL}/activity/park`;

const getAuthHeaders = (): Record<string, string> => {
	const token = Cookies.get('token');
	return token ? { 'Authorization': `Bearer ${token}` } : {};
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

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		const msg = `${errorData.detail} ${response.statusText}`;
		dbg('ERROR', 'POST ERROR', msg);
		throw new Error(`POST failed: ${msg}`);
	}

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

	if (!response.ok) {
		const errorData: ErrorResponse = await response.json();
		const msg = `${errorData.detail} ${response.statusText}`;
		dbg('ERROR', 'GET ERROR', msg);
		throw new Error(`GET failed: ${msg}`);
	}

	const data = await response.json();
	dbg('FETCH', 'GET RESPONSE', { response, data });

	return data;
};
