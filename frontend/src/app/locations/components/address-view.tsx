import type { Address } from '@/types';
import { FiNavigation } from 'react-icons/fi';

interface AddressViewProps {
	address: Address;
}

export const AddressView = ({ address }: AddressViewProps) => {
	return (
		<div className='top-0 flex' key={address.title}>
			<FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
			<p>
				{address.title}
				<br />
				{address.addressLineOne}
				{address.addressLineTwo && <br />}
				{address.addressLineTwo}
				<br />
				{address.city}, {address.state} {address.zipcode}
			</p>
		</div>
	);
};
