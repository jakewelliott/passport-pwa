import type { Park } from '@/types';
import { FiGlobe, FiMail, FiNavigation, FiPhone } from 'react-icons/fi';

export const LocationActionBar = ({ park }: { park: Park }) => {
    // TODO: styling here needs to be fixed
    return (
        <div
            className='relative right-4 flex w-svw flex-row items-center justify-evenly bg-secondary-darkteal py-2.5'
            data-testid='location-action-bar'
        >
            {park.coordinates?.latitude && park.coordinates.longitude && (
                <a
                    href={`https://www.google.com/maps/place/${park.coordinates.latitude},${park.coordinates.longitude}`}
                    className='text-system-white'
                >
                    <FiNavigation size={24} strokeWidth={2} />
                </a>
            )}
            {park.phone && (
                <a href={`tel://${park.phone}`} className='text-system-white'>
                    <FiPhone size={24} strokeWidth={2} />
                </a>
            )}
            {park.website && (
                <a href={park.website} className='text-system-white'>
                    <FiGlobe size={24} strokeWidth={2} />
                </a>
            )}
            {park.email && (
                <a href={`mailto:${park.email}`} className='text-system-white'>
                    <FiMail size={24} strokeWidth={2} />
                </a>
            )}
        </div>
    );
};
