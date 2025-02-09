import { FiNavigation, FiPhone } from 'react-icons/fi';
import { FaRegEnvelope } from 'react-icons/fa';
import type { Park } from '@/lib/mock/types';
import { AddressView } from './address-view';
import AchievementsView from './achievements-view';

interface LocationContactProps {
  park: Park;
}

export const LocationContact = ({ park }: LocationContactProps) => {
  return (
    <div className='m-4 flex flex-col gap-3'>
      <h2 style={{ width: '100%' }}>{park.name}</h2>
      {park.address && <AddressView address={park.address[0]} />}
      <div className='top-0 flex'>
        <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>
          GPS: {park.coordinates.latitude}, {park.coordinates.longitude}
        </p>
      </div>
      <div className='top-0 flex'>
        <FiPhone size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.phone}</p>
      </div>
      <div className='top-0 flex'>
        <FaRegEnvelope size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.email}</p>
      </div>
      <AchievementsView stamp={park.stamp} bucketList={park.bucketList} />
    </div>
  );
};
