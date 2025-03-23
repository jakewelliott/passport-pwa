import Header from '@/components/header';
import Layout from '@/components/layout';
import { SplashScreenWrapper } from '@/components/splash-screen';
import TabBar from '@/components/tab-bar';
import { router } from '@/routes';
import { Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dbg } from './lib/debug';

export const App = () => {
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

export default function AppWrapper() {
  return <RouterProvider router={router} />;
}
