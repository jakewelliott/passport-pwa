import { a11yOnClick } from "../../../lib/a11y";

interface LocationTabBarProps {
	choice: number;
	onChoiceChange: (newChoice: number) => void;
}

// TODO: replace with a library (react-tabs)
export const LocationTabBar: React.FC<LocationTabBarProps> = ({
	choice,
	onChoiceChange,
}) => {
	return (
		<div className="flex h-12 items-center justify-around border-supporting_bluegray border-b">
			{["Details", "Photos", "Notes"].map((tab, index) => (
				<div
					key={tab}
					{...a11yOnClick(() => onChoiceChange(index))}
					className={`relative flex h-full w-full cursor-pointer items-center justify-center p-2 ${
						choice === index ? "text-system_black" : "text-supporting_darkgray"
					}`}
				>
					<p>{tab}</p>
					<div
						className={`absolute right-0 bottom-0 left-0 h-0.5 bg-secondary_darkteal ${choice !== index ? "hidden" : ""}`}
					/>
				</div>
			))}
		</div>
	);
};
