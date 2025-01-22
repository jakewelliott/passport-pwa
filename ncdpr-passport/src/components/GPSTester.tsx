import { useState } from "react";

interface Location {
	latitude: number;
	longitude: number;
	accuracy: number;
	timestamp: number;
}

export const GPSTester = () => {
	const [location, setLocation] = useState<Location | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const getCurrentLocation = () => {
		setLoading(true);
		setError("");

		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
			setLoading(false);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					timestamp: position.timestamp,
				});
				setLoading(false);
			},
			(error) => {
				setError(error.message);
				setLoading(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			},
		);
	};

	return (
		<div className="gps-tester">
			<h2>GPS Location Tester</h2>

			<button type="button" onClick={getCurrentLocation} disabled={loading}>
				{loading ? "Getting Location..." : "Get Current Location"}
			</button>

			{error && <div className="error">Error: {error}</div>}

			{location && (
				<div className="location-info">
					<h3>Current Location:</h3>
					<p>Latitude: {location.latitude}</p>
					<p>Longitude: {location.longitude}</p>
					<p>Accuracy: ±{Math.round(location.accuracy)} meters</p>
					<p>Timestamp: {new Date(location.timestamp).toLocaleString()}</p>
				</div>
			)}
		</div>
	);
};
