import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Header from "./components/layout/header";
import TabBar from "./components/layout/tab-bar";
import Locations from "./app/locations/index";
import Stamps from "./app/stamps/index";
import More from "./app/more/index";
import LocationDetail from "./app/locations/location-detail";
import { AppInfo } from "./pages/more/app-info";
import { IconLegend } from "./pages/more/icon-legend";
import { BucketList } from "./pages/more/bucket-list";

export default function App() {
	return (
		<div className="app">
			<Header />
			<TabBar />
			<main className="flex-grow pb-16">
				<Routes>
					<Route path="/locations" element={<Locations />} />
					<Route path="/stamps" element={<Stamps />} />
					<Route path="/more" element={<More />} />
					<Route path="/more/app-info" element={<AppInfo />} />
					<Route path="/more/bucket-list" element={<BucketList />} />
					<Route path="/more/icon-legend" element={<IconLegend />} />
					<Route
						path="/locations/location-detail/:locationAbbreviation"
						element={<LocationDetail />}
					/>
				</Routes>
			</main>
		</div>
	);
}
