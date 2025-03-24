import { AddressView } from '@/app/locations/components/address-view';
import { ContactView } from '@/app/locations/components/contact-view';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationActionBar } from '@/app/locations/components/location-action-bar';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { BucketList } from '@/components/bucket-list';
import { GenericIcon } from '@/components/generic-icon';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { stampCollectedOn } from '@/components/stamp-collected-on';
import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import type { Park } from '@/types';
import { useParams } from 'react-router-dom';

const MiniTabs = ({ park }: { park: Park }) => (
  <LocationMiniTabBar>
    <DetailsMiniTab park={park} />
    <PhotoGalleryMiniTab park={park} />
    <NotesMiniTab parkId={park.id} />
  </LocationMiniTabBar>
);

export default function ParkInfoScreen() {
  dbg('RENDER', 'Location DetailTabs');
  const { abbreviation } = useParams();
  const parkAbbreviation = abbreviation as Uppercase<string>;

  const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);
  const { data: stamp, isLoading: isStampLoading } = useStamp(park?.id);

  if (isParkLoading || !park) return <LoadingPlaceholder what='park' />;
  if (isStampLoading) return <LoadingPlaceholder what='stamp' />;

  return (
    <div>
      <div className='m-6 flex flex-col gap-3'>
        <div>
          <h2>{park.parkName}</h2>
        </div>
        <AddressView park={park} />
        <ContactView park={park} />
        <GenericIcon name='stamp' text={stampCollectedOn(stamp)} />
        <BucketList parkId={park.id} />
      </div>
      <LocationActionBar park={park} />
      <MiniTabs park={park} />
    </div>
  );
}
