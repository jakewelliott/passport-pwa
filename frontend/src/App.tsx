import Header from '@/components/header';
import Layout from '@/components/layout';
import TabBar from '@/components/tab-bar';
import { useUser } from '@/hooks/queries/useUser';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { dbg } from '@/lib/debug';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scroll-to-top';

const App = () => {
  dbg('RENDER', 'App.tsx');
  const { data: user } = useUser();

  const { SplashScreen, splashFinished } = useSplashScreen();
  return (
    <>
      <ScrollToTop />
      <div className='app'>
        <Header />
        <Layout>
          <main>{!user ? <Outlet /> : splashFinished ? <Outlet /> : <SplashScreen />}</main>
        </Layout>
        <TabBar />
      </div>
      <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
    </>
  );
};

export default App;
