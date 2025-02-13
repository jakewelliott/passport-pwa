import { useUser } from "@/hooks/queries/useUser";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import { SplashScreen } from "@/components/splash-screen";
import { dbg } from "@/lib/debug";
import LoginPage from "./app/auth/login";
import Locations from "./app/locations";
import LocationDetail from "./app/locations/detail-tabs";
import Stamps from "./app/stamps";
import More from "./app/more";
import { AppInfo } from "./app/more/app-info";
import { IconLegend } from "./app/more/icon-legend";
import WelcomeMessage from "./app/more/welcome-message";
import { Trails } from "./app/more/trails";
import StayingSafe from "./app/more/staying-safe";
import { HikingEssentials } from "./app/more/hiking-essentials";
import { BucketList } from "./app/more/bucket-list";
import { MyNotes } from "./app/more/my-notes";
import { EditGeneralNotes } from "./app/more/general-notes";
import { AdminPage } from "@/app/admin";

const RoleBasedRedirect = () => {
	const { data: user, isLoading } = useUser();
	const location = useLocation();
	if (isLoading) return <SplashScreen loadingMsg="your account" />;
	if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
	dbg("RENDER", "RoleBasedRedirect", user.role);
	if (user.role === "admin") return <Navigate to="/admin" replace />;
	return <Navigate to="/locations" replace />;
};

const AdminRoutes = () => {
	const { data: user, isLoading } = useUser();
	const isLoggedIn = user && !isLoading;
	const isAdmin = isLoggedIn && user?.role === "admin";

	if (isLoading) return <SplashScreen loadingMsg="checking permissions" />;
	if (!isAdmin) return <Navigate to="/locations" replace />;

	dbg("RENDER", "AdminRoutes", `user is ${!isAdmin ? "not" : ""} an admin`);

	return (
		<Routes>
			<Route index element={<AdminPage />} />
		</Routes>
	);
};

const LoggedInRoutes = () => {
	dbg('RENDER', 'LoggedInRoutes');

	return (
		<Routes>
			{/* Location tab */}
			<Route path="/locations">
				<Route index element={<Locations />} />
				<Route path=":abbreviation" element={<LocationDetail />} />
			</Route>
			{/* Stamps tab */}
			<Route path="/stamps" element={<Stamps />} />
			{/* More tab */}
			<Route path="/more">
				<Route index element={<More />} />
				<Route path="app-info" element={<AppInfo />} />
				<Route path="icon-legend" element={<IconLegend />} />
				<Route path="welcome-message" element={<WelcomeMessage />} />
				<Route path="trails" element={<Trails />} />
				<Route path="staying-safe" element={<StayingSafe />} />
				<Route path="hiking-essentials" element={<HikingEssentials />} />
				<Route path="bucket-list" element={<BucketList />} />
				<Route path="my-notes">
					<Route index element={<MyNotes />} />
					<Route path="general-notes" element={<EditGeneralNotes />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/locations" replace />} />
		</Routes>
	);
};

export const AppRoutes = () => {
	dbg('RENDER', 'AppRoutes');

	const { data: user, isLoading } = useUser();
	const isLoggedIn = user && !isLoading;

	if (isLoading) return <SplashScreen loadingMsg="your role" />;

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/" element={<RoleBasedRedirect />} />
			<Route path="/admin/*" element={<AdminRoutes />} />
			<Route
				path="/*"
				element={
					isLoggedIn ? <LoggedInRoutes /> : <RoleBasedRedirect />
				}
			/>
		</Routes>
	);
}