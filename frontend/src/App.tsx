import { Routes, Route } from 'react-router-dom';
import { SplashScreenWrapper } from '@/components/splash-screen';
import '@/styles/globals.css';
import Header from '@/components/layout/header.tsx';
import TabBar from '@/components/layout/tab-bar.tsx';
import Locations from '@/app/locations/index.tsx';
import Stamps from '@/app/stamps/index.tsx';
import More from '@/app/more/index.tsx';
import LocationDetail from '@/app/locations/location-detail.tsx';
import { AppInfo } from '@/app/more/app-info.tsx';
import { BucketList } from '@/app/more/bucket-list.tsx';
import { IconLegend } from '@/app/more/icon-legend.tsx';
import { MyNotes } from '@/app/more/my-notes.tsx';
import { EditGeneralNotes } from '@/app/more/general-notes.tsx';
import { Trails } from '@/app/more/trails.tsx';
import { HikingEssentials } from './app/more/hiking-essentials.tsx';
import StayingSafe from './app/more/staying-safe.tsx';
import WelcomeMessage from './app/more/welcome-message.tsx';

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
            <Route path='/more/my-notes' element={<MyNotes />} />
            <Route path='/more/my-notes/general-notes' element={<EditGeneralNotes />} />
          </Routes>
        </main>
      </div>
    </SplashScreenWrapper>
  );
}
