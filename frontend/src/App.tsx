import Header from '@/components/header';
import Layout from '@/components/layout';
import TabBar from '@/components/tab-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSplashScreen } from './hooks/useSplashScreen';
import { dbg } from './lib/debug';
import { AppRoutes } from './routes';

export default function App() {
	dbg('RENDER', 'App.tsx');
	const { SplashScreen, splashFinished } = useSplashScreen();

	return (
		<>
			<div className='app'>
				<Header />
				<Layout>
					<main>{splashFinished ? <AppRoutes /> : <SplashScreen />}</main>
				</Layout>
				<TabBar />
			</div>
			<ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
		</>
	);
}
