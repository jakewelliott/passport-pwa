import { Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Header from './components/layout/header';
import TabBar from './components/layout/tab-bar';
import Locations from './app/locations/index';
import Stamps from './app/stamps/index';
import More from './app/more/index';
import LocationDetail from './app/locations/location-detail';
import { AppInfo } from './app/more/app-info';
import { IconLegend } from './app/more/icon-legend';
import { BucketList } from './app/more/bucket-list';
import { Trails } from './pages/more/trails';
import { SplashScreenWrapper } from './components/splash-screen';
import WelcomeMessage from './app/more/welcome-message';
import StayingSafe from './app/more/staying-safe';
import { HikingEssentials } from './app/more/hiking-essentials';

export default function App() {
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
            <Route path='/more/app-info' element={<AppInfo />} />
            <Route path='/more/bucket-list' element={<BucketList />} />
            <Route path='/more/icon-legend' element={<IconLegend />} />
            <Route path='/locations/location-detail/:locationAbbreviation' element={<LocationDetail />} />
            <Route path='/more/trails' element={<Trails />} />
            <Route path='/more/welcome-message' element={<WelcomeMessage />} />
            <Route path='/more/staying-safe' element={<StayingSafe />} />
            <Route path='/more/hiking-essentials' element={<HikingEssentials />} />
          </Routes>
        </main>
      </div>
    </SplashScreenWrapper>
  );
}
