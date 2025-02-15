import { useState } from 'react';
import { FiNavigation, FiPhone } from 'react-icons/fi';
import { FaRegEnvelope } from 'react-icons/fa';
import type { Park, ParkActivity } from '@/lib/mock/types';
import { AddressView } from './address-view';
import AchievementsView from './achievements-view';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface LocationContactProps {
	park: Park;
	parkActivity: ParkActivity
}

export const LocationContact = ({ park, parkActivity }: LocationContactProps) => {
	const [showAllAddresses, setShowAllAddresses] = useState(false);

	const toggleAddresses = () => {
		setShowAllAddresses(!showAllAddresses);
	};

	const addressesToShow = showAllAddresses ? park.addresses : park.addresses?.slice(0, 2);

	return (
		<div className='m-4 flex flex-col gap-3' data-testid='location-contact'>
			<h2 style={{ width: '100%' }}>{park.parkName}</h2>
			{park.addresses && park.addresses.length > 0 && (
				<>
					{addressesToShow.map((address, index) => (
						<AddressView key={index} address={address} />
					))}
					{park.addresses.length > 2 && (
						<button 
							onClick={toggleAddresses}
							className="inline-flex items-center ml-4"
						>
							{showAllAddresses ? <>Show Less <MdExpandLess className="ml-1" /></> : <>Show More <MdExpandMore className="ml-1" /></>}
						</button>
					)}
				</>
			)}
			{park.coordinates && park.coordinates.latitude && park.coordinates.longitude && (
				<div className='top-0 flex'>
					<FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
					<p>
						GPS: {park.coordinates.latitude}, {park.coordinates.longitude}
					</p>
				</div>
			)}
			{park.phone && (
				<div className='top-0 flex'>
					<FiPhone size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
					<p>{park.phone}</p>
				</div>
			)}
			{park.email && (
				<div className='top-0 flex'>
					<FaRegEnvelope size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
					<p>{park.email}</p>
				</div>
			)}
			<AchievementsView parkActivity={parkActivity} park={park} />
		</div>
	);
};
