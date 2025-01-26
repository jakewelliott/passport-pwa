// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { SplashScreenWrapper } from './components/layout/splash-screen-wrapper';
import './styles/globals.css';
import Header from './components/layout/header.tsx';
import TabBar from './components/layout/tab-bar.tsx';
import Locations from './pages/locations/index.tsx';
import Stamps from './pages/stamps/index.tsx';
import More from './pages/more/index.tsx';
import LocationDetail from './pages/locations/location-detail.tsx';

function App() {
  return (
    <SplashScreenWrapper>
      <div className='app'>
        <Header />
        <TabBar />
        <main className='flex-grow pb-16'>
          <Routes>
            <Route path='/locations' element={<Locations />} />
            <Route path='/stamps' element={<Stamps />} />
            <Route path='/more' element={<More />} />
            <Route path='/locations/location-detail/:locationAbbreviation' element={<LocationDetail />} />
          </Routes>
        </main>
      </div>
    </SplashScreenWrapper>
  );
}

export default App;
