import type { Address, Park } from '@/types';
import { useState } from 'react';
import { FiNavigation } from 'react-icons/fi';


const ParkAddress = ({ address }: { address: Address }) => {
	return (
		<div>
			<p>{address.title}</p>
			<p>{address.addressLineOne}</p>
			{address.addressLineTwo && <p>{address.addressLineTwo}</p>}
			<p>{address.city}, {address.state} {address.zipcode}</p>
		</div>
	);
};

export const AddressView = ({ park }: { park: Park }) => {

	const [showAll, setShowAll] = useState(false);
	const showButton = park.addresses && park.addresses.length > 1;

	const toggle = () => {
		setShowAll(!showAll);
	};

	const OtherAddresses = () =>
		park.addresses.slice(1).map((address) => (
			<ParkAddress key={address.title} address={address} />
		))


	const Button = () =>
		<button type='button' onClick={toggle} className='ml-4 inline-flex items-center'>
			{showAll ? 'Show Less' : 'Show More'}
		</button>

	return (
		<div className='top-0 flex' key={park.parkName}>
			<FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<ParkAddress address={park.addresses[0]} />
			{showAll && <OtherAddresses />}
			{showButton && <Button />}
		</div>
	);
};
