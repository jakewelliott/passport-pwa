import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { decodeToken } from '@/lib/token-helper';
import { queryClient } from '@/lib/tanstack-local-storage';
import type { LoginCredentials, ErrorResponse } from '@/lib/mock/types';
import { useNavigate } from 'react-router-dom';

/**
 * Logs in a user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useLogin = () => {
  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const responseData: ErrorResponse = await response.json();
        throw new Error(responseData.detail || 'Login failed. Please try again later.');
      }
      return response.text();
    },
    onSuccess: (data) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });

      const userDetails = decodeToken(data);
      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));
    },
  });
};

/**
 * Registers a new user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useRegister = () => {
  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await fetch('http://localhost:5002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const responseData: ErrorResponse = await response.json();
        throw new Error(responseData.detail || 'Registration failed. Please try again later.');
      }
      return response.text();
    },
    onSuccess: (data) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });

      const userDetails = decodeToken(data);
      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));
    },
  });
};

/**
 * Logs out the user and redirects to the home page
 * Clears the token from cookies, invalidates the user query, and removes the user from local storage
 */
export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    Cookies.remove('token');
    queryClient.invalidateQueries({
      queryKey: ['user'],
      refetchType: 'all',
    });
    localStorage.removeItem('user');
    navigate('/');
  };
};
