import type { Park } from '@/types';
import { FiGlobe, FiMail, FiNavigation, FiPhone } from 'react-icons/fi';

export const LocationActionBar = ({ park }: { park: Park }) => {
    // TODO: styling here needs to be fixed
    return (
        <div
            className='flex flex-row items-center justify-evenly bg-secondary-darkteal py-2.5'
            data-testid='location-action-bar'
        >
            {park.coordinates?.latitude && park.coordinates.longitude && (
                <a
                    href={`https://www.google.com/maps/place/${park.coordinates.latitude},${park.coordinates.longitude}`}
                    className='text-supporting-inactiveblue'
                >
                    <FiNavigation size={24} strokeWidth={3} />
                </a>
            )}
            {park.phone && (
                <a href={`tel://${park.phone}`} className='text-supporting-inactiveblue'>
                    <FiPhone size={24} strokeWidth={3} />
                </a>
            )}
            {park.website && (
                <a href={park.website} className='text-supporting-inactiveblue'>
                    <FiGlobe size={24} strokeWidth={3} />
                </a>
            )}
            {park.email && (
                <a href={`mailto:${park.email}`} className='text-supporting-inactiveblue'>
                    <FiMail size={24} strokeWidth={3} />
                </a>
            )}
        </div>
    );
};
