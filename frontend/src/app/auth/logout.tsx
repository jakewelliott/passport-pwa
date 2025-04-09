import { useLogout } from '@/hooks/auth/useLogout';
import { useEffect } from 'react';
export const LogoutScreen = () => {
    const logout = useLogout();

    // NOTE: this is going to make a two toasts because it gets called twice in strict mode
    useEffect(() => {
        logout();
    }, [logout]);

    return <div className='flex h-screen items-center justify-center'>Logging you out...</div>;
};
