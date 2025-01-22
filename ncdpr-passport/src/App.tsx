import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PWABadge from "./PWABadge.tsx";
import Notes from "./pages/Notes.tsx";
import OfflineTest from "./pages/OfflineTest.tsx";
import "./App.css";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const handleOffline = () => {
			navigate("/offline-test");
		};

		const handleOnline = () => {
			if (window.location.pathname === "/offline-test") {
				navigate("/");
			}
		};

		window.addEventListener("offline", handleOffline);
		window.addEventListener("online", handleOnline);

		// Check initial state
		if (!navigator.onLine) {
			navigate("/offline-test");
		}

		return () => {
			window.removeEventListener("offline", handleOffline);
			window.removeEventListener("online", handleOnline);
		};
	}, [navigate]);

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Notes />} />
				<Route path="/offline-test" element={<OfflineTest />} />
			</Routes>
			<PWABadge />
		</div>
	);
}

export default App;
