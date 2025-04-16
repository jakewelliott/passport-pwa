import { dbg } from '@/lib/debug';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiMap2Line } from 'react-icons/ri';
import { Link } from 'react-router';
import { Box } from './components/box';

import { PassportHeader } from '@/components/passport-header';
const DownloadBox = () => (
    <Box title='DOWNLOAD PARK MAPS' headerClass='bg-secondary_orange' bodyClass='bg-supporting_lightorange'>
        <div className='-ml-6 float-left mt-6'>
            {/* TODO: add filling into the map cuz it goes over the side of the box */}
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
        headerClass='bg-supporting_inactiveblue'
        bodyClass='bg-supporting_lightblue flex flex-col gap-3'
    >
        <div className='flex flex-row justify-center gap-3'>
            <Link
                to={'https://www.facebook.com/NorthCarolinaStateParks/'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting_inactiveblue'
            >
                <FaFacebookF size={20} className='text-supporting_lightblue' />
            </Link>
            <Link
                to={'https://www.instagram.com/ncstateparks/'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting_inactiveblue'
            >
                <FaInstagram size={20} className='text-supporting_lightblue' />
            </Link>
            <Link
                to={'https://www.youtube.com/@parksNC'}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-supporting_inactiveblue'
            >
                <FaYoutube size={20} className='text-supporting_lightblue' />
            </Link>
        </div>
        <Link to={'www.ncparks.gov'} className='text-center text-supporting_inactiveblue'>
            www.ncparks.gov
        </Link>
        <p className='space-y-1'>
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
        <Box title='MAKE A RESERVATION' headerClass='bg-main_green' bodyClass='bg-supporting_green'>
            <div className='flex flex-col items-center gap-2'>
                <Row>
                    <img src={'/icons/misc/Picnic.svg'} alt={'picnic'} width={'36px'} height={'36px'} />
                    <Link to={'https://www.ncparks.gov/reservations'} className='p-mini'>
                        ncparks.gov/reservations
                    </Link>
                    <p className='p-mini'>1-877-722-6762</p>
                </Row>
                <Row>
                    {/* @ts-ignore */}
                    <img src={'/icons/misc/Camping.svg'} alt={'campsite'} width={'36px'} height={'36px'} />
                    <p className='p-mini'>
                        Reserve campsites, picnic shelters and other park facilities online or over the phone.
                    </p>
                </Row>
            </div>
        </Box>
    );
};

export const AppInfo = () => {
    dbg('RENDER', '/more/app-info');
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
