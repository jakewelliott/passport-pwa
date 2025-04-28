import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PWABadge from './components/PWABadge';
import Header from './components/header';
import ScrollToTop from './components/scroll-to-top';
import TabBar from './components/tab-bar';
import { useUser } from './hooks/queries/useUser';
import { useSplashScreen } from './hooks/useSplashScreen';
import { dbg } from './lib/debug';

const Content = () => {
    dbg('RENDER', 'Content');
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) return <Outlet />;

    dbg('RENDER', 'Content', 'with borders');
    return (
        <main className='mb-16 flex-1 overflow-y-scroll p-4'>
            <Outlet />
            <ScrollToTop />
        </main>
    );
};

/**
 * Main App component
 *
 * This is the main component for the app. It is used to render the app.
 *
 * @returns {React.ReactNode} The main component
 */
const App = () => {
    dbg('RENDER', 'App.tsx');

    const { SplashScreen } = useSplashScreen();
    const { isLoggedIn } = useUser();

    return (
        <div className='fixed inset-0 flex flex-col'>
            <Header />
            <TabBar />
            <Content />
            {isLoggedIn && <SplashScreen />}
            <PWABadge />
            <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
        </div>
    );
};

export default App;
