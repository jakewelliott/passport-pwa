import { useLogout } from '@/hooks/auth/useLogout';
import { dbg } from '@/lib/debug';
import { useEffect } from 'react';

/**
 * Logout screen
 *
 * This is the logout screen for the app. Automatically logs out the user.
 *
 * @returns {React.ReactNode} The logout screen
 */
export const LogoutScreen = () => {
    dbg('RENDER', '/logout');
    const logout = useLogout();

    // NOTE: this is going to make a two toasts because it gets called twice in strict mode
    useEffect(() => {
        logout();
    }, [logout]);

    return <div className='flex h-screen items-center justify-center'>Logging you out...</div>;
};
