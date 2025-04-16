import App from '@/App';
import { AdminPage } from '@/app/admin';
import CollectStamp from '@/app/stamps/collect-stamp';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import { Navigate, Outlet, type RouteObject, createBrowserRouter } from 'react-router';
import EditBucketList from './app/admin/edit-bucket-list';
import EditParks from './app/admin/edit-parks';
import EditTrails from './app/admin/edit-trails';
import LoginPage from './app/auth/login';
import { LogoutScreen } from './app/auth/logout';
import Locations from './app/locations';
import LocationDetail from './app/locations/park-info';
import More from './app/more';
import { AppInfo } from './app/more/app-info';
import { EditGeneralNotes } from './app/more/general-notes';
import { HikingEssentials } from './app/more/hiking-essentials';
import { IconLegend } from './app/more/icon-legend';
import { MyNotes } from './app/more/my-notes';
import MyProfileScreen from './app/more/my-profile';
import StayingSafe from './app/more/staying-safe';
import { Trails } from './app/more/trails';
import WelcomeMessage from './app/more/welcome-message';
import Stamps from './app/stamps';
import { BucketList } from './components/bucket-list';

const RoleBasedRedirect = () => {
    const { isLoggedIn, data: user, isLoading } = useUser();
    if (isLoading) return null;
    if (!isLoggedIn) return <Navigate to='/login' replace />;
    if (!user) return null;

    dbg('RENDER', 'RoleBasedRedirect', user.role);
    return user.role === 'admin' ? <Navigate to='/admin' replace /> : <Navigate to='/locations' replace />;
};

const AdminRoutes = () => {
    dbg('RENDER', 'AdminRoutes');
    const { data: user, isLoading } = useUser();
    if (isLoading) return null;
    if (!isLoading && user?.role !== 'admin') {
        return <Navigate to='/locations' replace />;
    }
    return <Outlet />;
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

const ProtectedRoute = () => {
    const { data: user } = useUser();
    return user ? <Outlet /> : <Navigate to='/login' replace />;
};

// exported so we can cache the routes in the service worker
export const routes: RouteObject[] = [
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
                children: [
                    { index: true, element: <AdminPage /> },
                    { path: 'edit-parks', element: <EditParks /> },
                    { path: 'edit-trails', element: <EditTrails /> },
                    { path: 'edit-bucket-list', element: <EditBucketList /> },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
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
                                    {
                                        path: 'bucket-list',
                                        element: <BucketList showAddress={true} />,
                                    },
                                    {
                                        path: 'my-notes',
                                        children: [
                                            { index: true, element: <MyNotes /> },
                                            { path: 'general-notes', element: <EditGeneralNotes /> },
                                        ],
                                    },
                                    {
                                        path: 'my-profile',
                                        element: <MyProfileScreen />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
