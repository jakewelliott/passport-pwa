import { AdminPage } from '@/app/admin';
import CollectStamp from '@/app/stamps/collect-stamp';
import { SplashScreen } from '@/components/splash-screen';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginPage from './app/auth/login';
import Locations from './app/locations';
import LocationDetail from './app/locations/detail-tabs';
import More from './app/more';
import { AppInfo } from './app/more/app-info';
import { BucketList } from './app/more/bucket-list';
import { EditGeneralNotes } from './app/more/general-notes';
import { HikingEssentials } from './app/more/hiking-essentials';
import { IconLegend } from './app/more/icon-legend';
import { MyNotes } from './app/more/my-notes';
import StayingSafe from './app/more/staying-safe';
import { Trails } from './app/more/trails';
import WelcomeMessage from './app/more/welcome-message';
import Stamps from './app/stamps';
import { useStamps } from './hooks/queries/useStamps';
import { useParkCheck } from './hooks/useParkCheck';
import type { CollectedStamp } from './lib/mock/types';

const isCollected = (code: string, stamps: CollectedStamp[]) =>
	stamps?.some((stamp) => stamp.parkAbbreviation === code) ?? false;

const RoleBasedRedirect = () => {
	const { data: user, isLoading } = useUser();
	const location = useLocation();
	if (isLoading) return <SplashScreen loadingMsg='your account' />;
	if (!user)
		return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
	dbg('RENDER', 'RoleBasedRedirect', user.role);
	if (user.role === 'admin') return <Navigate to='/admin' replace />;
	return <Navigate to='/locations' replace />;
};

const AdminRoutes = () => {
	dbg('RENDER', 'AdminRoutes');
	const locaiton = useLocation();
	const { data: user, isLoading } = useUser();
	if (isLoading) return <SplashScreen loadingMsg='checking permissions' />;
	if (!isLoading && user?.role !== 'admin') {
		toast.error(`You are not authorized to access this page ${locaiton.pathname}`);
		return <Navigate to='/locations' replace />;
	}

	return (
		<Routes>
			<Route index element={<AdminPage />} />
		</Routes>
	);
};

const LoggedInRoutes = () => {
	dbg('RENDER', 'LoggedInRoutes');
	const [showCollectModal, setShowCollectModal] = useState(false);
	const { park } = useParkCheck();
	const { data: stamps } = useStamps();
	useEffect(() => {
		// Initial check
		if (park && !isCollected(park.abbreviation, stamps ?? [])) {
			setShowCollectModal(true);
		}

		// Set up interval for checking every 5 minutes
		const interval = setInterval(() => {
			if (park && !isCollected(park.abbreviation, stamps ?? [])) {
				setShowCollectModal(true);
			}
		}, 5 * 60 * 1000); // 5 minutes in milliseconds

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, [park, stamps]);

	return (
		<>
			<Routes>
				{/* Location tab */}
				<Route path='/locations'>
					<Route index element={<Locations />} />
					<Route path=':abbreviation' element={<LocationDetail />} />
				</Route>
				{/* Stamps tab */}
				<Route path='/stamps' element={<Stamps />} />
				{/* More tab */}
				<Route path='/more'>
					<Route index element={<More />} />
					<Route path='app-info' element={<AppInfo />} />
					<Route path='icon-legend' element={<IconLegend />} />
					<Route path='welcome-message' element={<WelcomeMessage />} />
					<Route path='trails' element={<Trails />} />
					<Route path='staying-safe' element={<StayingSafe />} />
					<Route path='hiking-essentials' element={<HikingEssentials />} />
					<Route path='bucket-list' element={<BucketList />} />
					<Route path='my-notes'>
						<Route index element={<MyNotes />} />
						<Route path='general-notes' element={<EditGeneralNotes />} />
					</Route>
				</Route>
				<Route path='*' element={<Navigate to='/locations' replace />} />
			</Routes>

			{showCollectModal && park && (
				<CollectStamp onClose={() => setShowCollectModal(false)} park={park} />
			)}
		</>
	);
};

export const AppRoutes = () => {
	dbg('RENDER', 'AppRoutes');

	const { data: user, isLoading } = useUser();
	const isLoggedIn = user && !isLoading;

	if (isLoading) return <SplashScreen loadingMsg='your role' />;

	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/' element={<RoleBasedRedirect />} />
			<Route path='/admin/*' element={<AdminRoutes />} />
			<Route path='/*' element={isLoggedIn ? <LoggedInRoutes /> : <RoleBasedRedirect />} />
		</Routes>
	);
};
