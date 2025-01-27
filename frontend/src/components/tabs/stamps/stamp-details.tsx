import type { ParkCode, UserStamp } from "@/lib/mock/types";
import { IoClose } from "react-icons/io5";
import DateHelper from "@/lib/date-helper";
import { useUserStamp } from "@/hooks/useUserStamp";
import { usePark } from "@/hooks/queries/useParks";
import { a11yOnClick } from "@/lib/a11y";

interface StampsDetailProps {
	code: ParkCode;
	handleClose: () => void;
}

const CollectedOn = ({ stamp }: { stamp: UserStamp | null }) =>
	stamp == null ? (
		<p className="font-medium text-amber-600">Stamp not yet collected</p>
	) : (
		<p className="font-medium">
			Stamp collected on {DateHelper.stringify(stamp.timestamp)}
		</p>
	);

const CollectedManually = ({ stamp }: { stamp: UserStamp | null }) =>
	stamp == null ? null : stamp.location !== null ? null : (
		<p className="font-medium text-amber-600">Stamp collected manually</p>
	);

const LoadingPlaceholder = () => (
	<article className="relative bg-supporting_lightblue p-4">
		<header>
			<div className="flex-row justify-between items-center">
				<h3 className="font-semibold text-xl pr-4 animate-pulse">Loading...</h3>
				<div className="absolute top-2 right-2 w-8 h-8" />
			</div>
		</header>
	</article>
);

export const StampDetails = ({ code, handleClose }: StampsDetailProps) => {
	// Get our data from hooks
	const stamp = useUserStamp(code);
	const { data: park } = usePark(code);

	// If we're loading, show a loading placeholder
	if (park === undefined || stamp === undefined) return <LoadingPlaceholder />;

	return (
		<article className="relative bg-supporting_lightblue p-4">
			<header>
				<div className="flex-row justify-between items-center">
					<h3 className="font-semibold text-xl pr-4">{park.name}</h3>
					<button
						className="absolute top-2 right-2 rounded-full p-1 transition-colors hover:bg-black/10"
						onClick={handleClose}
						type="button"
						aria-label="Close park details"
					>
						{/* TODO: fix horizontal alignment */}
						<span
							className="text-system_gray text-h4 font-bold cursor-pointer"
							{...a11yOnClick(handleClose)}
						>
							&times;
						</span>
					</button>
				</div>
			</header>
			<div className="">
				<p>{park.city}</p>
				<CollectedOn stamp={stamp} />
				<a
					href={`/locations/location-detail/${park.code}`}
					className="inline-block text-blue-600 transition-colors hover:text-blue-800 hover:underline"
				>
					View More Park Details <span aria-hidden="true">&gt;</span>
				</a>
				<CollectedManually stamp={stamp || null} />
			</div>
		</article>
	);
};
