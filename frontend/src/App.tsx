import Header from '@/components/header';
import Layout from '@/components/layout';
import TabBar from '@/components/tab-bar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSplashScreen } from './hooks/useSplashScreen';
import { dbg } from './lib/debug';

const App = () => {
	dbg('RENDER', 'App.tsx');

	const { SplashScreen, splashFinished } = useSplashScreen();
	return (
		<>
			<div className='app'>
				<Header />
				<Layout>
					<main>
						{splashFinished ? <Outlet /> : <SplashScreen />}
					</main>
				</Layout>
				<TabBar />
			</div>
			<ToastContainer position='bottom-right' theme='colored' closeOnClick draggable style={{ zIndex: 9999 }} />
		</>
	);
};

export default App;
