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

    const handleLogout = () => {
        dbg('AUTH', 'Logging out...');

        Cookies.remove('token');

        queryClient.invalidateQueries({
            queryKey: ['user'],
            refetchType: 'all',
        });

        // NOTE: this is going to get called twice because of the useEffect in the LogoutScreen
        setTimeout(() => {
            dbg('AUTH', 'Successfully logged out');
            toast.success('Successfully logged out');
            navigate('/login');
        }, 500);
    };

    return handleLogout;
};
