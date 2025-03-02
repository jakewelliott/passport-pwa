import type { Park } from '@/types';
import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiNavigation, FiPhone } from 'react-icons/fi';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import AchievementsView from './achievements-view';
import { AddressView } from './address-view';
interface LocationContactProps {
  park: Park;
}

export const LocationContact = ({ park }: LocationContactProps) => {
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
          {addressesToShow.map((address) => (
            <AddressView key={address.addressLineOne} address={address} />
          ))}
          {park.addresses.length > 2 && (
            <button type='button' onClick={toggleAddresses} className='ml-4 inline-flex items-center'>
              {showAllAddresses ? (
                <>
                  Show Less <MdExpandLess className='ml-1' />
                </>
              ) : (
                <>
                  Show More <MdExpandMore className='ml-1' />
                </>
              )}
            </button>
          )}
        </>
      )}
      {park.coordinates?.latitude && park.coordinates.longitude && (
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
      <AchievementsView park={park} />
    </div>
  );
};
