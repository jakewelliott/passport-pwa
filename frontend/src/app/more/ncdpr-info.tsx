import { dbg } from '@/lib/debug';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiMap2Line } from 'react-icons/ri';
import { Link } from 'react-router';
import { Box } from './components/box';

import { PassportHeader } from '@/components/passport-header';
const DownloadBox = () => (
    <Box title='DOWNLOAD PARK MAPS' headerClass='bg-secondary-orange' bodyClass='bg-supporting-lightorange'>
        <div className='-ml-6 float-left mt-6'>
            {/* TODO: add filling into the map cuz it goes over the side of the box */}
            {/* This is intended behavior. Copied look from paper passport shows it going outside the box */}
            <RiMap2Line size={90} style={{ transform: 'rotate(-25deg)' }} />
        </div>
        <p className='text-center'>
            Save paper and save trees by getting a digital map of the park before you visit!
            <br />
            <br />
            Go to ncparks.gov, pick a park, and download the map or get more information.
        </p>
    </Box>
);

const ContactUsBox = () => (
    <Box
        title='CONTACT US'
        headerClass='bg-supporting-inactiveblue'
        bodyClass='bg-supporting-lightblue flex flex-col gap-3 items-center'
    >
        <div className='flex flex-row justify-center gap-3'>
            <Link
                to={'https://www.facebook.com/NorthCarolinaStateParks/'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting-inactiveblue'
            >
                <FaFacebookF size={20} className='text-supporting-lightblue' />
            </Link>
            <Link
                to={'https://www.instagram.com/ncstateparks/'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting-inactiveblue'
            >
                <FaInstagram size={20} className='text-supporting-lightblue' />
            </Link>
            <Link
                to={'https://www.youtube.com/@parksNC'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting-inactiveblue'
            >
                <FaYoutube size={20} className='text-supporting-lightblue' />
            </Link>
        </div>
        <Link to={'www.ncparks.gov'} className='text-center text-supporting-inactiveblue'>
            www.ncparks.gov
        </Link>
        <p className='space-y-1 text-center'>
            <span>NC Division of Parks and Recreation</span>
            <br />
            <span>Dept. of Natural and Cultural Resources</span>
            <br />
            <span>1615 Mail Service Center</span>
            <br />
            <span>Raleigh, NC 27699</span>
            <br />
            <span>(919) 707-9300</span>
        </p>
    </Box>
);

const ReservationsBox = () => {
    const Row = ({ children }: { children: React.ReactNode }) => (
        <div className='flex w-full flex-row items-center gap-2'>{children}</div>
    );
    return (
        <Box title='MAKE A RESERVATION' headerClass='bg-main-green' bodyClass='bg-supporting-green'>
            <div className='flex flex-col items-center gap-2'>
                <Row>
                    <img src={'/icons/park/PicnicShelter-Black.svg'} alt={'picnic'} width={'36px'} height={'36px'} />
                    <div className=''>
                        <a href={'https://www.ncparks.gov/reservations'} className='text-pmini'>
                            ncparks.gov/reservations
                        </a>
                        <p className='text-pmini'>1-877-722-6762</p>
                    </div>
                </Row>
                <Row>
                    <img src={'/icons/park/Camping-Black.svg'} alt={'campsite'} width={'36px'} height={'36px'} />
                    <p className='text-pmini'>
                        Reserve campsites, picnic shelters and other park facilities online or over the phone.
                    </p>
                </Row>
            </div>
        </Box>
    );
};

/**
 * NCDPR Info screen
 *
 * Shows info about the NCDPR, this was the "App Info" page but its oxymornic to have a page about how to download the app when they already are using it...
 *
 * @returns {React.ReactNode} The NCDPR info screen
 */
export const NCDPRInfo = () => {
    dbg('RENDER', '/more/ncdpr-info');
    return (
        <div className='flex flex-col gap-4'>
            <div className='mb-3.5'>
                <PassportHeader />
            </div>
            <ContactUsBox />
            <DownloadBox />
            <ReservationsBox />
        </div>
    );
};
