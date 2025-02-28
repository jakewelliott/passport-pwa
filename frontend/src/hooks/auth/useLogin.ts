import { dbg } from '@/lib/debug';
import { API_AUTH_LOGIN_URL, fetchPost } from '@/lib/fetch';
import type { LoginCredentials } from '@/lib/mock/types';
import { queryClient } from '@/lib/tanstack-local-storage';
import { decodeToken } from '@/lib/token-helper';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Logs in a user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

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

      navigate(redirect ?? '/');
    },
    onError: (error) => {
      dbg('ERROR', 'useLogin', error);
      toast.error(error.message);
    },
  });
};
