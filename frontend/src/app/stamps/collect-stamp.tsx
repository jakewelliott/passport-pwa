import RoundedButton from '@/components/rounded-button';
import { useCollectStamp } from '@/hooks/queries/useStamps';
import type { Park } from '@/lib/mock/types';
import { useLocation as useUserLocation } from '@/hooks/useLocation';

interface CollectStampProps {
  park: Park;
  onClose: () => void;
}

export default function CollectStamp({ park, onClose }: CollectStampProps) {
  const collectStampMutation = useCollectStamp(park.abbreviation);
  const userLocation = useUserLocation();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-secondary_lightblue' style={{ zIndex: 9999 }}>
      <div className='m-auto flex max-w-3xl flex-col items-center gap-8 text-center'>
        <span 
          className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-supporting_darkgray'
          onClick={onClose}
        >
          &times;
        </span>
        <h1 className='text-secondary_darkteal uppercase'>Woohoo!!!</h1>
        <p className='p-large'>
          Your location indicates that you are at {park.parkName}. You have not collected the badge at this
          location yet.{' '}
        </p>
        <RoundedButton title={'Collect!'} onClick={() => {
          collectStampMutation.mutate({
            latitude: userLocation.geopoint?.latitude || 0,
            longitude: userLocation.geopoint?.longitude || 0,
            inaccuracyRadius: userLocation.geopoint?.accuracy || 0,
            method: 'location',
            dateTime: new Date(),
          });
          onClose();
        }} />
        <img src={`/stamps/${park.abbreviation}.svg`} width={'150px'} alt={`${park.parkName} stamp`} />
      </div>
    </div>
  );
}
