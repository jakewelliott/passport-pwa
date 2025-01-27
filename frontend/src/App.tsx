import { Routes, Route } from "react-router-dom";
import { SplashScreenWrapper } from "./components/layout/splash-screen-wrapper";
import "./styles/globals.css";
import Header from "./components/layout/header.tsx";
import TabBar from "./components/layout/tab-bar.tsx";
import Locations from "./pages/locations/index.tsx";
import Stamps from "./pages/stamps/index.tsx";
import More from "./pages/more/index.tsx";
import LocationDetail from "./pages/locations/location-detail.tsx";
import { AppInfo } from "./pages/more/app-info.tsx";
import { BucketList } from "./pages/more/bucket-list.tsx";
import { IconLegend } from "./pages/more/icon-legend.tsx";
import { MyNotes } from "./pages/more/my-notes.tsx";
import { EditGeneralNotes } from "./pages/more/general-notes";

function App() {
  return (
    <SplashScreenWrapper>
      <div className='app'>
        <Header />
        <TabBar />
        <main className='flex-grow pb-16'>
          <Routes>
            <Route path="/locations" element={<Locations />} />
            <Route path="/stamps" element={<Stamps />} />
            <Route path="/more" element={<More />} />
            <Route path="/locations/location-detail/:locationAbbreviation" element={<LocationDetail />} />
            <Route path="/more/app-info" element={<AppInfo />} />
            <Route path="/more/bucket-list" element={<BucketList />} />
            <Route path="/more/icon-legend" element={<IconLegend />} />
            <Route path="/more/my-notes" element={<MyNotes />} />
            <Route path="/more/my-notes/general-notes" element={<EditGeneralNotes />} />
          </Routes>
        </main>
      </div>
    </SplashScreenWrapper>
  );
}

export default App;
