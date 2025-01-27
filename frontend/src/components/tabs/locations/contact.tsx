import { FiNavigation, FiPhone } from "react-icons/fi";
import {
	FaStamp,
	FaRegSquare,
	FaRegCheckSquare,
	FaRegEnvelope,
} from "react-icons/fa";
import type { Address, Park, UserStamp } from "@/lib/mock/types";

interface BucketListItemDetails {
	text: string;
	status: boolean;
}

interface LocationContactProps {
	park: Park;
}

export const LocationContact = ({ park }: LocationContactProps) => {
	return (
		<div className="m-4 flex flex-col gap-3">
			<h2 style={{ width: "100%" }}>{park.name}</h2>
			{park.address.map((address: Address) => (
				<div className="top-0 flex" key={address.description}>
					<FiNavigation
						size={"17px"}
						strokeWidth={3}
						style={{ paddingRight: "5px", paddingTop: "5px" }}
					/>
					{/* TODO: make an AddressView component */}
					<p>
						{address.description}
						<br />
						{address.addressLineOne}
						<br />
						{address.city}, {address.state} {address.zip}
					</p>
				</div>
			))}
			<div className="top-0 flex">
				<FiNavigation
					size={"17px"}
					strokeWidth={3}
					style={{ paddingRight: "5px", paddingTop: "5px" }}
				/>
				<p>
					GPS: {park.coordinates.latitude}, {park.coordinates.longitude}
				</p>
			</div>
			<div className="top-0 flex">
				<FiPhone
					size={"17px"}
					strokeWidth={3}
					style={{ paddingRight: "5px", paddingTop: "5px" }}
				/>
				<p>{park.phone}</p>
			</div>
			<div className="top-0 flex">
				<FaRegEnvelope
					size={"17px"}
					strokeWidth={3}
					style={{ paddingRight: "5px", paddingTop: "5px" }}
				/>
				<p>{park.email}</p>
			</div>
			{/* <div className="top-0 flex">
				<FaStamp
					size={"17px"}
					strokeWidth={3}
					style={{ paddingRight: "5px", paddingTop: "5px" }}
				/>
				<p>
					{stamp
						? `Stamp collected ${park.stamp.time}`
						: "Stamp not yet collected"}
				</p>
			</div>
			{park.bucketList && (
				<div className="top-0 flex">
					{park.bucketList.status ? (
						<FaRegCheckSquare
							size={"17px"}
							strokeWidth={3}
							style={{ paddingRight: "5px", paddingTop: "5px" }}
						/>
					) : (
						<FaRegSquare
							size={"17px"}
							strokeWidth={3}
							style={{ paddingRight: "5px", paddingTop: "5px" }}
						/>
					)}
					<p>
						Bucket List Item:
						<br />
						{park.bucketList.text}
					</p>
				</div>
			)} */}
		</div>
	);
};
