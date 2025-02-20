import RoundedButton from '@/components/rounded-button';
import parks from '@/lib/mock/parks';
import type { Park } from '@/lib/mock/types';

export default function CollectStamp() {
  const parkDetails: Park = parks[0];
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-secondary_lightblue' style={{ zIndex: 9999 }}>
      <div className='m-auto flex max-w-3xl flex-col items-center gap-8 text-center'>
        <span className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-supporting_darkgray'>
          &times;
        </span>
        <h1 className='text-secondary_darkteal uppercase'>Woohoo!!!</h1>
        <p className='p-large'>
          Your location indicates that you are at {parkDetails.parkName}. You have not collected the badge at this
          location yet.{' '}
        </p>
        <RoundedButton title={'Collect!'} />
        <img src={`/stamps/${parkDetails.abbreviation}.svg`} width={'150px'} alt={`${parkDetails.parkName} stamp`} />
      </div>
    </div>
  );
}
