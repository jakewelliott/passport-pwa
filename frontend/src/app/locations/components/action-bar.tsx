import { FiNavigation, FiPhone, FiGlobe, FiMail } from 'react-icons/fi';
import type { Park } from '@/lib/mock/types';

export const LocationActionBar = ({ park }: { park: Park }) => {
  return (
    <div className='flex flex-row items-center justify-evenly bg-secondary_darkteal p-2.5'>
      <a href={`https://www.google.com/maps/place/${park.coordinates}`} className='text-supporting_inactiveblue'>
        <FiNavigation size={24} strokeWidth={4} />
      </a>
      <a href={`tel://${park.phone}`} className='text-supporting_inactiveblue'>
        <FiPhone size={24} strokeWidth={4} />
      </a>
      <a href={park.website} className='text-supporting_inactiveblue'>
        <FiGlobe size={24} strokeWidth={3} />
      </a>
      <a href={`mailto:${park.email}`} className='text-supporting_inactiveblue'>
        <FiMail size={24} strokeWidth={4} />
      </a>
    </div>
  );
};
