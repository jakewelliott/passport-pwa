import { ContactUs } from '@/app/more/components/contact-us';
import { DownloadParkMaps } from '@/app/more/components/download-park-maps';
import { Reservations } from '@/app/more/components/reservations';
import { PassportHeader } from '@/components/passport-header';

export const AppInfo = () => {
  return (
    <div className='mx-auto max-w-[500px]'>
      <div className='my-3.5'>
        <PassportHeader />
      </div>
      <ContactUs />
      <DownloadParkMaps />
      <Reservations />
    </div>
  );
};
