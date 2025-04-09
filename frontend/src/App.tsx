import Header from '@/components/header';
import TabBar from '@/components/tab-bar';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { dbg } from '@/lib/debug';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scroll-to-top';
import { useUser } from './hooks/queries/useUser';

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

const App = () => {
    dbg('RENDER', 'App.tsx');

    const { isLoggedIn } = useUser();
    const { SplashScreen } = useSplashScreen();

    return (
        <div className='fixed inset-0 flex flex-col'>
            <Header />
            <TabBar />
            <Content />
            {isLoggedIn && <SplashScreen />}
            <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
        </div>
    );
};

export default App;
