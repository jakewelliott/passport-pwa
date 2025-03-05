import { useLogout } from '@/hooks/auth/useLogout';
import { useEffect } from 'react';

export const LogoutScreen = () => {
	const logout = useLogout();
	useEffect(() => {
		logout();
	}, []);
	return <div className='flex h-screen items-center justify-center'>Logging you out...</div>;
};
