import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SplashScreen, { SplashScreenWrapper } from "@/components/splash-screen";
import Header from "@/components/header";
import TabBar from "@/components/tab-bar";
import Locations from "@/app/locations/index.tsx";
import More from "@/app/more/index.tsx";
import LocationDetail from "@/app/locations/detail-tabs.tsx";
import { AppInfo } from "@/app/more/app-info.tsx";
import { BucketList } from "@/app/more/bucket-list.tsx";
import { IconLegend } from "@/app/more/icon-legend.tsx";
import { MyNotes } from "@/app/more/my-notes.tsx";
import { EditGeneralNotes } from "@/app/more/general-notes.tsx";
import { Trails } from "@/app/more/trails.tsx";
import { HikingEssentials } from "@/app/more/hiking-essentials.tsx";
import StayingSafe from "@/app/more/staying-safe.tsx";
import WelcomeMessage from "@/app/more/welcome-message.tsx";
import LoginPage from "@/app/auth/login";
import { useUser } from "@/hooks/queries/useUser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Stamps from "./app/stamps";

const PrivateRoute = ({
	children,
	allowedRoles,
}: {
	children: JSX.Element;
	allowedRoles: string[];
}) => {
	const { data: user, isLoading } = useUser(); // Fetch user data using your custom hook
	const location = useLocation();

	if (isLoading) return <SplashScreen loadingMsg="user" />; // Show a loading spinner while fetching user data
	if (user == null) return <Navigate to="/login" replace />; // If user is not logged in, redirect to login page

	if (!user) {
		// If the user is not logged in, redirect to the login page
		const redirectPath = encodeURIComponent(location.pathname + location.search);
		return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
	}
	if (!allowedRoles.includes(user.role)) {
		console.log("User role not allowed on this route: ", user.role);
		return <Navigate to="/locations" replace />;
	}

	return children;
};

const RoleBasedRedirect = () => {
	const { data: user, isLoading } = useUser();
	const location = useLocation();

	if (isLoading) {
		return <SplashScreen />;
	}

	if (!user) {
		const redirectPath = encodeURIComponent(location.pathname + location.search);
		return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
	}

	if (user.role === "admin") {
		return <Navigate to="/more" replace />;
	}
	return <Navigate to="/locations" replace />;
};

const LoggedOutRoutes = () => {
	const location = useLocation();
	const redirectPath = encodeURIComponent(location.pathname + location.search);
	return (
		<SplashScreenWrapper>
			<main className="flex-grow">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<Navigate to={`/login?redirect=${redirectPath}`} replace />} />
				</Routes>
			</main>
			<ToastContainer
				position="bottom-right"
				theme="colored"
				closeOnClick
				draggable
				style={{ zIndex: 9999 }}
			/>
		</SplashScreenWrapper>
	);
};

export default function App() {
	const { data: user, isLoading } = useUser();

	if (isLoading) return <SplashScreen loadingMsg="user" />;
	if (!user) return <LoggedOutRoutes />

	return (
		<SplashScreenWrapper>
			<div className="app">
				<Header />
				<TabBar />
				<main className={"flex-grow pb-16"}>
					<Routes>
						{/* Public routes */}
						<Route path="/login" element={<LoginPage />} />

						{/* Root redirect */}
						<Route path="/" element={<RoleBasedRedirect />} />

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
								path="/locations/:abbreviation"
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
					</Routes>
				</main>
			</div>
			<ToastContainer
				position="bottom-right"
				theme="colored"
				closeOnClick
				draggable
			/>
		</SplashScreenWrapper>
	);
}
