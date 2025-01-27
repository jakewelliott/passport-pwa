import { useMemo, useState } from "react";
import { userStamps } from "@/lib/mock/user";
import { StampDetails } from "./stamp-details";
import type { UserStamp, Park } from "@/lib/mock/types";
import parks from "@/lib/mock/parks";
import { stampSVG } from "@/lib/strings";

const isAchieved = (code: string) =>
	userStamps.some((stamp: UserStamp) => stamp.code === code);

const sortByName = (a: Park, b: Park) => a.name.localeCompare(b.name);

// TODO: make this use a query instead of directly accessing dummy data
export const StampsOverview = () => {
	const [selectedPark, setSelectedPark] = useState<Park | null>(null);

	const sortedParks: Park[] = useMemo(() => {
		const achieved = parks
			.filter((park: Park) => isAchieved(park.code))
			.sort(sortByName);

		const notAchieved = parks
			.filter((park: Park) => !isAchieved(park.code))
			.sort(sortByName);

		return [...achieved, ...notAchieved];
	}, []);

	return (
		<div className="mx-auto my-4">
			{selectedPark ? (
				<StampDetails
					code={selectedPark.code}
					handleClose={() => setSelectedPark(null)}
				/>
			) : null}
			{sortedParks.map((park: Park) => (
				<div className="mx-9 my-4 flex justify-evenly" key={park.code}>
					<button
						key={park.code}
						onClick={() => setSelectedPark(park)}
						className="mx-3"
						type="button"
					>
						<img
							className={`h-24 w-24 object-contain ${isAchieved(park.code) ? "opacity-100" : "opacity-25"}`}
							src={stampSVG(park.code)}
							alt={`${park.name} stamp`}
						/>
					</button>
				</div>
			))}
		</div>
	);
};
