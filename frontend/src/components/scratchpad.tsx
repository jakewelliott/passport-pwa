import type { Geopoint } from "@/lib/mock/types";
import { TrailIcon } from "./common/trail-icons";
import { useParkCheck } from "@/hooks/useParkCheck";

const IconBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-row items-center gap-2 rounded-md bg-secondary_lightgreen p-2">
			{children}
		</div>
	);
};

const spoofLocation: Geopoint = {
	latitude: 35.6679,
	longitude: -80.9443,
};

export const Scratchpad = () => {
	const { park, isLoading } = useParkCheck(spoofLocation);

	return (
		<div className="flex flex-col items-center gap-2">
			<h1>Scratchpad</h1>
			<IconBox>
				<TrailIcon iconName="Hiking-Red" size="sm" showText />
				<TrailIcon iconName="Hiking-Red" size="sm" showText />
				<TrailIcon iconName="Hiking-Red" size="sm" showText />
			</IconBox>
			<IconBox>
				<TrailIcon iconName="Camping-Green" size="md" />
				<TrailIcon iconName="Camping-Green" size="md" />
				<TrailIcon iconName="Camping-Green" size="md" />
			</IconBox>
			<IconBox>
				<TrailIcon iconName="BoatRamp-Blue" size="lg" showText />
				<TrailIcon iconName="BoatRamp-Blue" size="lg" showText />
				<TrailIcon iconName="BoatRamp-Blue" size="lg" showText />
			</IconBox>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : park ? (
					<p>{park.name}</p>
				) : (
					<p>You don't seem to be in a park</p>
				)}
			</div>
		</div>
	);
};
