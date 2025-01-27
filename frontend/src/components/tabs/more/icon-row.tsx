interface IconRowProps {
	iconName: string;
	title: string;
	extraText?: string;
}

export const IconRow = ({ iconName, title, extraText }: IconRowProps) => {
	return (
		<div className="m-4 flex items-center">
			<img
				src={`../park-icons/${iconName}`}
				alt={title}
				width={"36px"}
				height={"36px"}
			/>
			<div className="ml-2 flex w-full flex-col justify-center">
				<p>{title}</p>
				<p className="p-mini">{extraText}</p>
			</div>
		</div>
	);
};
