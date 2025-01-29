import { Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreenWrapper } from '@/components/splash-screen';
import '@/styles/globals.css';
import Header from '@/components/layout/header.tsx';
import TabBar from '@/components/layout/tab-bar.tsx';
import Locations from '@/app/locations/index.tsx';
import Stamps from '@/app/stamps/index.tsx';
import More from '@/app/more/index.tsx';
import LocationDetail from '@/app/locations/detail-tabs.tsx';
import { Scratchpad } from '@/components/scratchpad.tsx';
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
            {/* Default redirect */}
            <Route path='/' element={<Navigate to='/locations' replace />} />

            {/* Main tab routes */}
            <Route path='/locations'>
              <Route index element={<Locations />} />
              <Route path='/locations/:abbreviation' element={<LocationDetail />} />
            </Route>
            <Route path='/stamps' element={<Stamps />} />

            {/* More section routes */}
            <Route path='/more'>
              <Route index element={<More />} />

              {/* Information routes */}
              <Route path='app-info' element={<AppInfo />} />
              <Route path='icon-legend' element={<IconLegend />} />
              <Route path='welcome-message' element={<WelcomeMessage />} />

              {/* Hiking related routes */}
              <Route path='trails' element={<Trails />} />
              <Route path='staying-safe' element={<StayingSafe />} />
              <Route path='hiking-essentials' element={<HikingEssentials />} />

              {/* User content routes */}
              <Route path='bucket-list' element={<BucketList />} />
              <Route path='my-notes'>
                <Route index element={<MyNotes />} />
                <Route path='general-notes' element={<EditGeneralNotes />} />
              </Route>
            </Route>
            <Route path='/scratchpad' element={<Scratchpad />} />
          </Routes>
        </main>
      </div>
    </SplashScreenWrapper>
  );
}
