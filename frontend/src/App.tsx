import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SplashScreen, { SplashScreenWrapper } from "@/components/splash-screen";
import "@/styles/globals.css";
import Header from "@/components/layout/header.tsx";
import TabBar from "@/components/layout/tab-bar.tsx";
import Locations from "@/app/locations/index.tsx";
import Stamps from "@/app/stamps/index";
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
import { queryClient } from "./lib/tanstack-local-storage";
import { api } from "./lib/mock/api";

const PrivateRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { data: user, isLoading } = useUser(); // Fetch user data using your custom hook

  if (isLoading) {
    return <SplashScreen />; // Show a loading spinner while fetching user data
  }

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to a default page (e.g., locations)
    return <Navigate to="/locations" replace />;
  }

  // If the user is authenticated and has an allowed role, render the children
  return children;
};

const RoleBasedRedirect = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/more" replace />;
  }

  return <Navigate to="/locations" replace />;
};

export default function App() {
  var { data: user, isLoading } = useUser();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logoutUser();
    await queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all",
    });
    navigate("/");
    user = useUser().data;
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!user) {
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
  }

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
            ></Route>

            {/* More section routes */}
            <Route
              path="/more"
              element={
                <PrivateRoute allowedRoles={["visitor", "admin"]}>
                  <More onLogout={handleLogout} />
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
            ></Route>
          </Routes>
        </main>
      </div>
      <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable />
    </SplashScreenWrapper>
  );
}
