import type React from "react";
import {
	type Park,
	userStamps,
} from "../../../lib/utils/StampsOverviewService";
import { IoClose } from "react-icons/io5";

interface StampsDetailProps {
	park: Park;
	isAchieved: (parkCode: string) => boolean;
	onClose: () => void;
}

export const StampsDetail: React.FC<StampsDetailProps> = ({
	park,
	isAchieved,
	onClose,
}) => {
	const achievementInfo = userStamps.find(
		(achievement) => achievement.code === park.code,
	);

	return (
		<div className="relative bg-supporting_lightblue p-4">
			<h3>{park.name}</h3>
			<p>{park.city}</p>
			<p>
				{isAchieved(park.code)
					? `Stamp collected ${new Date(Date.parse(achievementInfo?.date)).toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })}`
					: "Stamp not yet collected"}
			</p>
			{isAchieved(park.code) && achievementInfo?.method === "manual" && (
				<p className="warning">Stamp collected manually</p>
			)}
			<a
				href={`/locations/location-detail/${park.code}`}
				className="text-blue-500 hover:underline"
			>
				View More Park Details {">"}
			</a>
			<button className="absolute top-1 right-1 p-1" onClick={onClose}>
				<IoClose size={24} />
			</button>
		</div>
	);
};
