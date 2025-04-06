import Header from '@/components/header';
import TabBar from '@/components/tab-bar';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { dbg } from '@/lib/debug';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scroll-to-top';

const App = () => {
    dbg('RENDER', 'App.tsx');
    const { SplashScreen } = useSplashScreen();
    return (
        <main className='layout no-scrollbar h-screen w-screen max-w-full overflow-hidden overflow-x-hidden'>
            <ScrollToTop />
            <Header />
            <Outlet />
            <TabBar />
            <SplashScreen />
            <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
        </main>
    );
};

export default App;
