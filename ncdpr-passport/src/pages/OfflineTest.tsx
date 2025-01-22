import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GPSTester } from "../components/GPSTester";

export default function OfflineTest() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const navigate = useNavigate();

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			navigate("/"); // Redirect to home when back online
		};
		const handleOffline = () => setIsOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, [navigate]);

	return (
		<div className="offline-test">
			<h1>Offline Mode</h1>
			<div className="status-card">
				<p>Current Status: {isOnline ? "Online" : "Offline"}</p>
				<p>This page is available even when you're offline!</p>
			</div>
			{isOnline && (
				<p className="redirect-message">
					You're back online! Redirecting to home...
				</p>
			)}
			<GPSTester />
		</div>
	);
}
