import { FiNavigation } from 'react-icons/fi';
import type { Address } from '@/lib/mock/types';

interface AddressViewProps {
  address: Address;
}

export const AddressView = ({ address }: AddressViewProps) => {
  return (
    <div className='top-0 flex' key={address.description}>
      <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
      <p>
        {address.description}
        <br />
        {address.addressLineOne}
        {address.addressLineTwo && <br />}
        {address.addressLineTwo}
        <br />
        {address.city}, {address.state} {address.zip}
      </p>
    </div>
  );
};