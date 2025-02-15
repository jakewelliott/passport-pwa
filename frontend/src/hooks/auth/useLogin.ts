import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { decodeToken } from '@/lib/token-helper';
import { queryClient } from '@/lib/tanstack-local-storage';
import type { LoginCredentials } from '@/lib/mock/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_AUTH_LOGIN_URL } from '@/lib/fetch';
import { fetchPost } from '@/lib/fetch';
import { dbg } from '@/lib/debug';

/**
 * Logs in a user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async ({ username, password }) => {
			dbg('MUTATE', 'Logging in', { username, password });
      const response = await fetchPost(API_AUTH_LOGIN_URL, {
        username,
        password,
      });
      return await response.text();
    },
    onSuccess: (data, { username }) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });
      const userDetails = decodeToken(data);

      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));

      setTimeout(() => {
        toast.success(`Welcome back, ${username}`);
      }, 1000);

			navigate('/');
    },
    onError: (error) => {
			dbg('ERROR', 'useLogin', error);
      toast.error(error.message);
    }
  });
};