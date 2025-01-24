import { useState } from "react";
import { useParks, usePark } from "../hooks/useParks";
import { useStamps, useCollectStamp } from "../hooks/useStamps";
import { useUserStamps } from "../hooks/useUser";

export const QueryTester = () => {
	const [selectedParkId, setSelectedParkId] = useState<number | null>(null);
	// Using a hardcoded userId for demo purposes
	const userId = 1;

	const { data: parks, isLoading: parksLoading } = useParks();
	const { data: selectedPark } = usePark(selectedParkId ?? 0);
	const { data: parkStamps } = useStamps(selectedParkId ?? 0);
	// const { data: user } = useUser(userId);
	const { data: userStamps } = useUserStamps(userId);
	const collectStamp = useCollectStamp();

	if (parksLoading) return <div>Loading parks...</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Query Test Page</h1>

			{/* Parks List */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2">Parks</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{parks?.map((park) => (
						<div
							key={park.id}
							className="border p-4 rounded cursor-pointer hover:bg-gray-50"
							onClick={() => setSelectedParkId(park.id)}
							onKeyUp={(e) => e.key === "Enter" && setSelectedParkId(park.id)}
							onKeyDown={(e) => e.key === "Enter" && setSelectedParkId(park.id)}
						>
							<h3 className="font-semibold">{park.name}</h3>
							<p>{park.location}</p>
						</div>
					))}
				</div>
			</div>

			{/* Selected Park Details */}
			{selectedPark && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Selected Park Details</h2>
					<div className="border p-4 rounded">
						<h3 className="font-semibold">{selectedPark.name}</h3>
						<p>{selectedPark.description}</p>
						<p>
							Location: {selectedPark.latitude}, {selectedPark.longitude}
						</p>
					</div>
				</div>
			)}

			{/* Park Stamps */}
			{parkStamps && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Park Stamps</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{parkStamps.map((stamp) => (
							<div key={stamp.id} className="border p-4 rounded">
								<h3 className="font-semibold">{stamp.name}</h3>
								<p>{stamp.description}</p>
								<button
									type="button"
									className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
									onClick={() =>
										collectStamp.mutate({
											parkId: selectedParkId ?? 0,
											stampId: stamp.id,
										})
									}
								>
									Collect Stamp
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* User's Collected Stamps */}
			{userStamps && (
				<div>
					<h2 className="text-xl font-semibold mb-2">Your Collected Stamps</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{userStamps.map((stamp) => (
							<div key={stamp.id} className="border p-4 rounded">
								<h3 className="font-semibold">{stamp.name}</h3>
								<p>{stamp.description}</p>
								<p className="text-sm text-gray-500">
									Collected: {stamp.dateCollected}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
