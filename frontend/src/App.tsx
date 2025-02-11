import { Routes, Route, Navigate, } from "react-router-dom";
import SplashScreen, { SplashScreenWrapper } from "@/components/splash-screen";
import "@/styles/globals.css";
import Header from "@/components/layout/header.tsx";
import TabBar from "@/components/layout/tab-bar.tsx";
import Locations from "@/app/locations/index.tsx";
import More from "@/app/more/index.tsx";
import LocationDetail from "@/app/locations/detail-tabs.tsx";
import { Scratchpad } from "@/components/scratchpad.tsx";
import { AppInfo } from "@/app/more/app-info.tsx";
import { BucketList } from "@/app/more/bucket-list.tsx";
import { IconLegend } from "@/app/more/icon-legend.tsx";
import { MyNotes } from "@/app/more/my-notes.tsx";
import { EditGeneralNotes } from "@/app/more/general-notes.tsx";
import { Trails } from "@/app/more/trails.tsx";
import { HikingEssentials } from "@/app/more/hiking-essentials.tsx";
import StayingSafe from "@/app/more/staying-safe.tsx";
import WelcomeMessage from "@/app/more/welcome-message.tsx";
import LoginPage from "@/app/login.tsx";
import { useUser } from "@/hooks/queries/useUser";
import { ToastContainer } from "react-toastify";
import Stamps from "./app/stamps";
import { useLogout } from "./hooks/useAuth";

const PrivateRoute = ({
	children,
	allowedRoles,
}: {
	children: JSX.Element;
	allowedRoles: string[];
}) => {
	const { data: user, isLoading } = useUser();

	if (isLoading) return <SplashScreen loadingMsg="user" />; // Show a loading spinner while fetching user data
	if (user == null) return <Navigate to="/login" replace />; // If user is not logged in, redirect to login page

	if (!allowedRoles.includes(user.role)) {
		console.log("User role not allowed on this route: ", user.role);
		return <Navigate to="/locations" replace />;
	}

	return children;
};

const RoleBasedRedirect = () => {
	const { data: user, isLoading } = useUser();
	if (isLoading) return <SplashScreen />;
	if (user == null) return <Navigate to="/login" replace />;
	if (user.role === "admin") return <Navigate to="/more" replace />;
	return <Navigate to="/locations" replace />;
};

const LoggedOutRoutes = () => {
	return (
		<SplashScreenWrapper>
			<main className="flex-grow">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</main>
		</SplashScreenWrapper>
	);
};

export default function App() {
	const { data: user, isLoading } = useUser();
	const handleLogout = useLogout();

	if (isLoading) return <SplashScreen loadingMsg="user" />;
	if (user == null) return <LoggedOutRoutes />;

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
						<Route
							path="/locations"
							element={
								<PrivateRoute allowedRoles={["visitor", 'admin']}>
									<Locations />
								</PrivateRoute>
							}
						>
							<Route
								path="/locations/:abbreviation"
								element={
									<PrivateRoute allowedRoles={["visitor"]}>
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
						<Route
							path="/more"
							element={
								<PrivateRoute allowedRoles={["visitor", "admin"]}>
									<More />
								</PrivateRoute>
							}
						>
							{/* Information routes */}
							<Route path="app-info" element={<AppInfo />} />
							<Route path="icon-legend" element={<IconLegend />} />
							<Route path="welcome-message" element={<WelcomeMessage />} />

							{/* Hiking related routes */}
							<Route path="trails" element={<Trails />} />
							<Route path="staying-safe" element={<StayingSafe />} />
							<Route path="hiking-essentials" element={<HikingEssentials />} />

							{/* User content routes */}
							<Route path="bucket-list" element={<BucketList />} />
							<Route path="my-notes">
								<Route index element={<MyNotes />} />
								<Route path="general-notes" element={<EditGeneralNotes />} />
							</Route>
						</Route>

						{/* Adam's scratchpad */}
						<Route
							path="/scratchpad"
							element={
								<PrivateRoute allowedRoles={["visitor", "admin"]}>
									<Scratchpad />
								</PrivateRoute>
							}
						/>
					</Routes>
				</main>
			</div>
			<ToastContainer position='bottom-right' theme='colored' closeOnClick draggable />
		</SplashScreenWrapper >
	);
}
