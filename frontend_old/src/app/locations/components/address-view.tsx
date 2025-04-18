import { GenericIcon } from '@/components/generic-icon';
import type { Park } from '@/types';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

export const AddressView = ({ park }: { park: Park }) => {
    const [showAll, setShowAll] = useState(false);

    const toggle = () => {
        setShowAll(!showAll);
    };

    const addressesToShow = showAll ? park.addresses : park.addresses?.slice(0, 2);

    const Button = () => (
        <button type='button' onClick={toggle} className='ml-7 inline-flex items-center'>
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
        <>
            {park.addresses && park.addresses.length > 0 && (
                <>
                    {addressesToShow.map((address) => (
                        <>
                            <GenericIcon key={park.parkName} name='location' text={address.title} />
                            {address.addressLineOne && <p className='-mt-3 ml-7'>{address.addressLineOne}</p>}
                            {address.addressLineTwo && <p className='-mt-3 ml-7'>{address.addressLineTwo}</p>}
                            {address.city && (
                                <p className='-mt-3 ml-7'>
                                    {address.city}, {address.state} {address.zipcode}
                                </p>
                            )}
                        </>
                    ))}
                    {park.addresses.length > 2 && <Button />}
                </>
            )}
        </>
    );
};
