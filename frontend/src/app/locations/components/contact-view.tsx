import type { Park } from '@/types';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiNavigation, FiPhone } from 'react-icons/fi';

export const ContactView = ({ park }: { park: Park }) => {
  return (
    <div className='mx-4 flex flex-col gap-3' data-testid='location-contact'>
      {/* Coordinates */}
      <div className='top-0 flex'>
        <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>
          GPS: {park.coordinates.latitude}, {park.coordinates.longitude}
        </p>
      </div>
      {/* Phone */}
      <div className='top-0 flex'>
        <FiPhone size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.phone}</p>
      </div>
      {/* Email */}
      <div className='top-0 flex'>
        <FaRegEnvelope size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.email}</p>
      </div>
    </div>
  );
};
