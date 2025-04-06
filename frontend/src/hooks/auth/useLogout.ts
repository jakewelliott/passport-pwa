import { dbg } from '@/lib/debug';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Logs out the user and redirects to the home page
 * Clears the token from cookies, invalidates the user query, and removes the user from local storage
 */
export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return () => {
        dbg('AUTH', 'Logging out...');
        Cookies.remove('token');
        queryClient.invalidateQueries({
            queryKey: ['user'],
            refetchType: 'all',
        });
        localStorage.removeItem('user');
        setTimeout(() => {
            navigate('/login');
            dbg('AUTH', 'Successfully logged out');
            toast.success('Successfully logged out');
        }, 2000);
    };
};
