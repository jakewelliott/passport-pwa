import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { decodeToken } from '@/lib/token-helper';
import { queryClient } from '@/lib/tanstack-local-storage';
import type { LoginCredentials } from '@/lib/mock/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPost } from '@/lib/fetch';
import { API_AUTH_REGISTER_URL } from '@/lib/fetch';
import { dbg } from '@/lib/debug';
/**
 * Registers a new user and redirects to the home page
 * Sets the token in cookies, invalidates the user query, and adds the user to local storage
 */
export const useRegister = () => {
  const navigate = useNavigate();

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

			navigate('/');
    },
    onError: (error) => {
			dbg('ERROR', 'useRegister', error);
			// TODO: be more verbose here
      toast.error(error.message);
    }
  });
};