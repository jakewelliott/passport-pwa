import type { Address, Park } from '@/types';
import { useState } from 'react';
import { FiNavigation } from 'react-icons/fi';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const ParkAddress = ({ address }: { address: Address }) => {
  return (
    <div>
      <p>{address.title}</p>
      <p>{address.addressLineOne}</p>
      {address.addressLineTwo && <p>{address.addressLineTwo}</p>}
      <p>
        {address.city}, {address.state} {address.zipcode}
      </p>
    </div>
  );
};

export const AddressView = ({ park }: { park: Park }) => {
  const [showAll, setShowAll] = useState(false);
  const showButton = park.addresses && park.addresses.length > 1;

  const toggle = () => {
    setShowAll(!showAll);
  };

  const addressesToShow = showAll ? park.addresses : park.addresses?.slice(0, 2);

  const Button = () => (
    <button type='button' onClick={toggle} className='ml-4 inline-flex items-center'>
      {showAll ? (
        <>
          Show Less <MdExpandLess className='ml-1' />
        </>
      ) : (
        <>
          Show More <MdExpandMore className='ml-1' />
        </>
      )}
    </button>
  );

  return (
    <div className='m-4 flex flex-col gap-3' data-testid='location-address'>
      {park.addresses && park.addresses.length > 0 && (
        <>
          {addressesToShow.map((address) => (
            <div className='top-0 flex' key={park.parkName}>
              <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
              <ParkAddress address={address} />
            </div>
          ))}
          {park.addresses.length > 2 && <Button />}
        </>
      )}
    </div>
  );
};
