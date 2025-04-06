import type { Park } from '@/types';
import { FiGlobe, FiMail, FiNavigation, FiPhone } from 'react-icons/fi';

export const LocationActionBar = ({ park }: { park: Park }) => {
    // TODO: styling here needs to be fixed
    return (
        <div
            className='flex flex-row items-center justify-evenly bg-secondary_darkteal p-2.5'
            data-testid='location-action-bar'
        >
            {park.coordinates?.latitude && park.coordinates.longitude && (
                <a
                    href={`https://www.google.com/maps/place/${park.coordinates.latitude},${park.coordinates.longitude}`}
                    className='text-supporting_inactiveblue'
                >
                    <FiNavigation size={24} strokeWidth={4} />
                </a>
            )}
            {park.phone && (
                <a href={`tel://${park.phone}`} className='text-supporting_inactiveblue'>
                    <FiPhone size={24} strokeWidth={4} />
                </a>
            )}
            {park.website && (
                <a href={park.website} className='text-supporting_inactiveblue'>
                    <FiGlobe size={24} strokeWidth={3} />
                </a>
            )}
            {park.email && (
                <a href={`mailto:${park.email}`} className='text-supporting_inactiveblue'>
                    <FiMail size={24} strokeWidth={4} />
                </a>
            )}
        </div>
    );
};
