import { RiMap2Line } from "react-icons/ri";

export const DownloadParkMaps = () => {
	return (
		<div className="p-4">
			<div className="bg-secondary_orange p-2 text-center text-system_white">
				<h3>DOWNLOAD PARK MAPS</h3>
			</div>
			<div className="flex items-center bg-supporting_lightorange p-2.5">
				<div className="-ml-8 float-left">
					<RiMap2Line size={90} style={{ transform: "rotate(-25deg)" }} />
				</div>
				<p className="text-center">
					Save paper and save trees by getting a digital map of the park before
					you visit!
					<br />
					<br />
					Go to ncparks.gov, pick a park, and download the map or get more
					information.
				</p>
			</div>
		</div>
	);
};
