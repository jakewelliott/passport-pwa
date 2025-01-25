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
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				GPS Location Tester
			</h2>

			<button
				type="button"
				onClick={getCurrentLocation}
				disabled={loading}
				className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
			>
				{loading ? "Getting Location..." : "Get Current Location"}
			</button>

			{error && (
				<div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					Error: {error}
				</div>
			)}

			{location && (
				<div className="mt-6 p-4 bg-gray-50 rounded-lg">
					<h3 className="text-lg font-semibold text-gray-800 mb-3">
						Current Location:
					</h3>
					<div className="space-y-2 text-gray-600">
						<p>
							Latitude: <span className="font-mono">{location.latitude}</span>
						</p>
						<p>
							Longitude: <span className="font-mono">{location.longitude}</span>
						</p>
						<p>
							Accuracy:{" "}
							<span className="font-mono">
								±{Math.round(location.accuracy)} meters
							</span>
						</p>
						<p>
							Timestamp:{" "}
							<span className="font-mono">
								{new Date(location.timestamp).toLocaleString()}
							</span>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
