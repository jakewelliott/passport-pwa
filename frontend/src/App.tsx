// src/App.tsx
import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Header from "./components/layout/header.tsx";
import TabBar from "./components/layout/tab-bar.tsx";
import Locations from "./app/locations/index.tsx";
import Stamps from "./app/stamps/index.tsx";
import More from "./app/more/index.tsx";
import LocationDetail from "./app/locations/location-detail.tsx";

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
					<Route
						path="/locations/location-detail/:locationAbbreviation"
						element={<LocationDetail />}
					/>
				</Routes>
			</main>
		</div>
	);
}
