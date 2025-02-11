import { Link } from 'react-router-dom';

export const Reservations = () => {
  return (
    <div className='p-4'>
      <div className='mb-3 flex items-center'>
        <img src='/icons/misc/Camping-Black.svg' alt='' className='mr-2 h-[50px] w-[50px]' />
        <div className='flex w-full flex-col justify-center'>
          <h4 className='pb-1 text-center text-main_green'>MAKE A RESERVATION</h4>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <Link to={'https://www.ncparks.gov/reservations'} className='p-mini'>
              ncparks.gov/reservations
            </Link>
            <p className='p-mini'>1-877-722-6762</p>
          </div>
        </div>
      </div>
      <div className='mt-3 flex items-center'>
        <img src='/icons/misc/PicnicShelter-Black.svg' alt='' className='mr-2 h-[50px] w-[50px]' />
        <p className='p-mini'>Reserve campsites, picnic shelters and other park facilities online or over the phone.</p>
      </div>
    </div>
  );
};
