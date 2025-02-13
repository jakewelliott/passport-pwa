import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';

export const ContactUs = () => {
  return (
    <div className='p-4'>
      <div className='bg-supporting_inactiveblue p-2 text-center text-system_white'>
        <h3>CONTACT US</h3>
      </div>
      <div className='space-y-2 bg-supporting_lightblue p-2.5 text-center'>
        <div>
          <Link to={'www.ncparks.gov'} className='text-supporting_inactiveblue no-underline'>
            www.ncparks.gov
          </Link>
        </div>
        <div className='flex justify-center gap-3'>
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
      </div>
    </div>
  );
};
