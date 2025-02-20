import Header from '@/components/header';
import Layout from '@/components/layout';
import { SplashScreenWrapper } from '@/components/splash-screen';
import TabBar from '@/components/tab-bar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { dbg } from './lib/debug';
import { AppRoutes } from './routes';

export default function App() {
  dbg('RENDER', 'App.tsx');
  return (
    <SplashScreenWrapper>
      <div className='app'>
        <Header />
        <Layout>
          <main>
            <SplashScreenWrapper>
              <AppRoutes />
            </SplashScreenWrapper>
          </main>
        </Layout>
        <TabBar />
      </div>
      <ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
    </SplashScreenWrapper>
  );
}
