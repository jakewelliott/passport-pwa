import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header';
import Layout from '@/components/layout';
import { SplashScreenWrapper } from '@/components/splash-screen';
import TabBar from '@/components/tab-bar';
import { dbg } from './lib/debug';
import { useUser } from '@/hooks/queries/useUser';
import LoginPage from './app/auth/login';
import { LogoutScreen } from './app/auth/logout';
import Locations from './app/locations';
import LocationDetail from './app/locations/detail-tabs';
import More from './app/more';
import { AppInfo } from './app/more/app-info';
import { EditGeneralNotes } from './app/more/general-notes';
import { HikingEssentials } from './app/more/hiking-essentials';
import { IconLegend } from './app/more/icon-legend';
import { MyNotes } from './app/more/my-notes';
import StayingSafe from './app/more/staying-safe';
import { Trails } from './app/more/trails';
import WelcomeMessage from './app/more/welcome-message';
import Stamps from './app/stamps';
import { BucketList } from './components/bucket-list';
import { AdminPage } from '@/app/admin';
import CollectStamp from '@/app/stamps/collect-stamp';
import { SplashScreen } from '@/components/splash-screen';

const App = () => {
  dbg('RENDER', 'App.tsx');
  return (
    <SplashScreenWrapper>
      <div className='app'>
        <Header />
        <Layout>
          <main>
            <SplashScreenWrapper>
              <Outlet />
            </SplashScreenWrapper>
          </main>
        </Layout>
        <TabBar />
      </div>
      <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
    </SplashScreenWrapper>
  );
};

const RoleBasedRedirect = () => {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <SplashScreen loadingMsg='your account' />;
  if (!user) return <Navigate to="/login" replace />;
  dbg('RENDER', 'RoleBasedRedirect', user.role);
  return user.role === 'admin' ? <Navigate to='/admin' replace /> : <Navigate to='/locations' replace />;
};

const AdminRoutes = () => {
  dbg('RENDER', 'AdminRoutes');
  const { data: user, isLoading } = useUser();
  if (isLoading) return <SplashScreen loadingMsg='checking permissions' />;
  if (!isLoading && user?.role !== 'admin') {
    return <Navigate to='/locations' replace />;
  }
  return <AdminPage />;
};

const LoggedInRoutes = () => {
  dbg('RENDER', 'LoggedInRoutes');
  return (
    <>
      <Outlet />
      <CollectStamp />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RoleBasedRedirect /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'logout', element: <LogoutScreen /> },
      {
        path: 'admin',
        element: <AdminRoutes />,
      },
      {
        element: <LoggedInRoutes />,
        children: [
          {
            path: 'locations',
            children: [
              { index: true, element: <Locations /> },
              { path: ':abbreviation', element: <LocationDetail /> },
            ],
          },
          { path: 'stamps', element: <Stamps /> },
          {
            path: 'more',
            children: [
              { index: true, element: <More /> },
              { path: 'app-info', element: <AppInfo /> },
              { path: 'icon-legend', element: <IconLegend /> },
              { path: 'welcome-message', element: <WelcomeMessage /> },
              { path: 'trails', element: <Trails /> },
              { path: 'staying-safe', element: <StayingSafe /> },
              { path: 'hiking-essentials', element: <HikingEssentials /> },
              { path: 'bucket-list', element: <BucketList showAddress={true} /> },
              {
                path: 'my-notes',
                children: [
                  { index: true, element: <MyNotes /> },
                  { path: 'general-notes', element: <EditGeneralNotes /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function AppWrapper() {
  return <RouterProvider router={router} />;
}
