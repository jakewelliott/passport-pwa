import type { ParkCode, UserStamp } from "@/lib/mock/types";
import { IoClose } from "react-icons/io5";
import DateHelper from "@/lib/date-helper";
import { useUserStamp } from "@/hooks/useUserStamp";
import { usePark } from "@/hooks/queries/useParks";

interface StampsDetailProps {
	code: ParkCode;
	handleClose: () => void;
}

const CollectedOn = ({ stamp }: { stamp: UserStamp | null }) =>
	stamp == null ? (
		<p className="text-amber-600 font-medium">Stamp not yet collected</p>
	) : (
		<p className="font-medium">
			Stamp collected on {DateHelper.stringify(stamp.timestamp)}
		</p>
	);

const CollectedManually = ({ stamp }: { stamp: UserStamp | null }) =>
	stamp == null ? null : stamp.location !== null ? null : (
		<p className="text-amber-600 font-medium">Stamp collected manually</p>
	);

const LoadingPlaceholder = () => (
	<output className="relative rounded-md bg-supporting_lightblue p-4">
		<span className="animate-pulse">Loading park details...</span>
	</output>
);

export const StampDetails = ({ code, handleClose }: StampsDetailProps) => {
	// Get our data from hooks
	const stamp = useUserStamp(code);
	const { data: park } = usePark(code);

	// If we're loading, show a loading placeholder
	if (park === undefined || stamp === undefined) return <LoadingPlaceholder />;

	return (
		<article className="relative rounded-md bg-supporting_lightblue p-4">
			<header>
				<h3 className="text-xl font-semibold mb-2">{park.name}</h3>
			</header>
			<div className="space-y-2">
				<p>{park.city}</p>
				<CollectedOn stamp={stamp} />
				<a
					href={`/locations/location-detail/${park.code}`}
					className="inline-block text-blue-600 hover:underline hover:text-blue-800 transition-colors"
				>
					View More Park Details <span aria-hidden="true">&gt;</span>
				</a>
				<CollectedManually stamp={stamp || null} />
			</div>
			<button
				className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
				onClick={handleClose}
				type="button"
				aria-label="Close park details"
			>
				<IoClose size={24} />
			</button>
		</article>
	);
};
