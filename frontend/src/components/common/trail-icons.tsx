import type { Trail } from "@/lib/mock/types";
import trailIconsJson from "public/trail-icons.json";

const TRAIL_ICON_PATH = (iconName: string) => `/park-icons/${iconName}.svg`;

const TrailIcon = ({ iconName }: { iconName: string }) => {
	// Find the icon data to get the proper title
	const iconData = trailIconsJson.find((icon) => icon.f === iconName);

	return (
		<img
			src={TRAIL_ICON_PATH(iconName)}
			alt={iconData?.t || iconName}
			className="w-6 h-6"
		/>
	);
};

export const TrailIcons = ({
	trail,
	className = "",
}: { trail: Trail; className?: string }) => {
	if (!trail.trailIcons?.length) return null;

	return (
		<div className={`flex gap-2 items-center ${className}`}>
			{trail.trailIcons.map((iconName) => (
				<TrailIcon key={iconName} iconName={iconName} />
			))}
		</div>
	);
};
