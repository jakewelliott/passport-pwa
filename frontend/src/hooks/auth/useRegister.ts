import { dbg } from '@/lib/debug';
import { API_AUTH_REGISTER_URL, fetchPost } from '@/lib/fetch';
import type { LoginCredentials } from '@/lib/mock/types';
import { queryClient } from '@/lib/tanstack-local-storage';
import { decodeToken } from '@/lib/token-helper';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
/**
 * Registers a new user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async ({ username, password }) => {
      dbg('MUTATE', 'useRegister', { username, password });
      const response = await fetchPost(API_AUTH_REGISTER_URL, {
        username,
        password,
      });
      return response.text();
    },
    onSuccess: (data, { username }) => {
      Cookies.set('token', data, { secure: true, sameSite: 'strict' });

      const userDetails = decodeToken(data);
      queryClient.setQueryData(['user'], { ...userDetails, token: data });
      localStorage.setItem('user', JSON.stringify(userDetails));

      setTimeout(() => {
        toast.success(`Successfully registered as ${username}`);
      }, 1000);

      navigate(redirect ?? '/');
    },
    onError: (error) => {
      dbg('ERROR', 'useRegister', error);
      // TODO: be more verbose here
      toast.error(error.message);
    },
  });
};
