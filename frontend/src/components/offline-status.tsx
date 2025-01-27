import { useEffect, useState } from "react";

const Status = ({ online }: { online: boolean }) => {
	const message = online
		? "You are currently online."
		: "You are currently offline. Some features may be limited.";

	const color = online ? "bg-green-100" : "bg-red-100";

	return (
		<div className={`w-full ${color} p-4`}>
			<div className="mx-auto max-w-7xl">
				<p className="text-center">{message}</p>
			</div>
		</div>
	);
};

export function OfflineStatus() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return <Status online={isOnline} />;
}
