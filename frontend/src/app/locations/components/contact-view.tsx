import { GenericIcon } from '@/components/generic-icon';
import type { Park } from '@/types';

export const ContactView = ({ park }: { park: Park }) => {
    return (
        <>
            {/* Coordinates */}
            <GenericIcon
                name='location'
                text={`GPS: ${park.coordinates.latitude.toFixed(4)}, ${park.coordinates.longitude.toFixed(4)}`}
            />
            {/* <div className='flex flex-row gap-2'>
        <FiNavigation strokeWidth={3} />
        <p>
          GPS: {park.coordinates.latitude.toFixed(4)}, {park.coordinates.longitude.toFixed(4)}
        </p>
      </div> */}
            {/* Phone */}
            <GenericIcon name='phone' text={String(park.phone).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')} />
            {/* <div className='flex flex-row gap-2'>
        <FiPhone strokeWidth={3} />
        <p>{String(park.phone).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
      </div> */}
            {/* Email */}
            <GenericIcon name='email' text={park.email} />
            {/* <div className='flex flex-row gap-2'>
        <FaRegEnvelope strokeWidth={3} />
        <p>{park.email}</p>
      </div> */}
        </>
    );
};
