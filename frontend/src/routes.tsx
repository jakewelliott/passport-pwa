import { useUser } from "@/hooks/queries/useUser";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import { SplashScreen, SplashScreenWrapper } from "@/components/splash-screen";
import { ToastContainer } from "react-toastify";
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

const PrivateRoute = ({
	children,
	allowedRoles,
}: {
	children: JSX.Element;
	allowedRoles: string[];
}) => {
	const { data: user, isLoading } = useUser(); // Fetch user data using your custom hook
	const location = useLocation();

	if (isLoading) return <SplashScreen loadingMsg="your role" />; // Show a loading spinner while fetching user data

	// If the user is not logged in, redirect to the login page
	if (!user) {
		const redirectPath = encodeURIComponent(location.pathname + location.search);
		return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
	}

	if (!allowedRoles.includes(user.role)) {
		dbg("MISC", "Insufficient role", user.role);
		return <Navigate to="/locations" replace />;
	}

	return children;
};

const RoleBasedRedirect = () => {
	const { data: user, isLoading } = useUser();
	const location = useLocation();

	if (isLoading) return <SplashScreen loadingMsg="your account" />;
	if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;

	dbg("RENDER", "RoleBasedRedirect", user.role);

	if (user.role === "admin") {
		return <Navigate to="/more" replace />;
	}

	return <Navigate to="/locations" replace />;
};

// const LoggedOutRoutes = () => {
// 	const location = useLocation();
// 	const redirectPath = encodeURIComponent(location.pathname + location.search);
// 	const { data: user, isLoading } = useUser();

// 	if (isLoading) return <SplashScreen loadingMsg="your role" />;
// 	if (user && !isLoading) return null;

// 	dbg('RENDER', 'LoggedOutRoutes');

// 	return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
// };

const LoggedInRoutes = () => {
	// const { data: user, isLoading } = useUser();
	// if (isLoading) return <SplashScreen loadingMsg="your role" />;
	// if (!user && !isLoading) return null;
	dbg('RENDER', 'LoggedInRoutes');

	return (
		<Routes>
			{/* Public routes */}
			{/* Main tab routes */}
			<Route path="/locations">
				<Route
					index
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<Locations />
						</PrivateRoute>
					}
				/>
				<Route
					path=":abbreviation"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<LocationDetail />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path="/stamps"
				element={
					<PrivateRoute allowedRoles={["visitor"]}>
						<Stamps />
					</PrivateRoute>
				}
			/>

			{/* More section routes */}
			<Route path="/more">
				<Route
					index
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<More />
						</PrivateRoute>
					}
				/>
				{/* Information routes */}
				<Route
					path="app-info"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<AppInfo />
						</PrivateRoute>
					}
				/>
				<Route
					path="icon-legend"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<IconLegend />
						</PrivateRoute>
					}
				/>
				<Route
					path="welcome-message"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<WelcomeMessage />
						</PrivateRoute>
					}
				/>

				{/* Hiking related routes */}
				<Route
					path="trails"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<Trails />
						</PrivateRoute>
					}
				/>
				<Route
					path="staying-safe"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<StayingSafe />
						</PrivateRoute>
					}
				/>
				<Route
					path="hiking-essentials"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<HikingEssentials />
						</PrivateRoute>
					}
				/>

				{/* User content routes */}
				<Route
					path="bucket-list"
					element={
						<PrivateRoute allowedRoles={["visitor", "admin"]}>
							<BucketList />
						</PrivateRoute>
					}
				/>
				<Route path="my-notes">
					<Route
						index
						element={
							<PrivateRoute allowedRoles={["visitor", "admin"]}>
								<MyNotes />
							</PrivateRoute>
						}
					/>
					<Route
						path="general-notes"
						element={
							<PrivateRoute allowedRoles={["visitor", "admin"]}>
								<EditGeneralNotes />
							</PrivateRoute>
						}
					/>
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
			<Route
				path="/*"
				element={
					isLoggedIn ? <LoggedInRoutes /> : <RoleBasedRedirect />
				}
			/>
		</Routes >
	);
}