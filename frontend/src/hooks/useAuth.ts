import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { decodeToken } from '@/lib/token-helper';
import { queryClient } from '@/lib/tanstack-local-storage';
import type { LoginCredentials, ErrorResponse } from '@/lib/mock/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Logs in a user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async ({ username, password }) => {
      console.log(process.env);
      // const port = process.env.PROD === 'DEV' ? {process.env.API_PORT}
      const response = await fetch(`http://localhost:${process.env.PROD === 'PROD' ? process.env.NGINX_PORT : process.env.API_DEV_PORT}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const responseData: ErrorResponse = await response.json();
        throw new Error(responseData.detail || 'Login failed. Please try again later.');
      }
      return response.text();
    },
    onSuccess: (data, { username }) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });

      const userDetails = decodeToken(data);
      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));
      
      toast.success(`Successfully logged in as ${username}`);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

/**
 * Registers a new user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async ({ username, password }) => {
      const response = await fetch('http://localhost:5002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const responseData: ErrorResponse = await response.json();
        throw new Error(responseData.detail || 'Registration failed. Please try again later.');
      }
      return response.text();
    },
    onSuccess: (data, { username }) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });

      const userDetails = decodeToken(data);
      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));
      
      toast.success(`Successfully registered as ${username}`);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

/**
 * Logs out the user and redirects to the home page
 * Clears the token from cookies, invalidates the user query, and removes the user from local storage
 */
export const useLogout = () => {
  const navigate = useNavigate();
  return async () => {

    console.log(localStorage.getItem('user'));
    console.log(queryClient.getQueryData(['user']));
    console.log(Cookies.get('token'));

    await Cookies.remove('token');
    await queryClient.removeQueries({
      queryKey: ['user'],
      refetchType: 'all',
    });
    await localStorage.removeItem('user');

    console.log(localStorage.getItem('user'));
    console.log(queryClient.getQueryData(['user']));
    console.log(Cookies.get('token'));

    navigate('/');
  };
};
