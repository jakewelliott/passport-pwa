import { dbg } from '@/lib/debug';
import { queryClient } from '@/lib/tanstack-local-storage';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Logs out the user and redirects to the home page
 * Clears the token from cookies, invalidates the user query, and removes the user from local storage
 */
export const useLogout = () => {
    const navigate = useNavigate();
    return () => {
        dbg('AUTH', 'Logging out...');
        Cookies.remove('token');
        queryClient.invalidateQueries({
            queryKey: ['user'],
            refetchType: 'all',
        });
        localStorage.removeItem('user');
        setTimeout(() => {
            navigate('/');
            dbg('AUTH', 'Successfully logged out');
            toast.success('Successfully logged out');
        }, 2000);
    };
};
