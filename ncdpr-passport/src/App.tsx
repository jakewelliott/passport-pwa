import { Routes, Route } from "react-router-dom";
import PWABadge from "./PWABadge.tsx";
import { OfflineStatus } from "./components/OfflineStatus.tsx";

import "./index.css";
import { HelloWorld } from "./pages/hello-world.tsx";

function App() {
	return (
		<div className="app">
			<OfflineStatus />
			<Routes>
				<Route path="/" element={<HelloWorld />} />
			</Routes>
			<PWABadge />
		</div>
	);
}

export default App;
