import { ContactView } from '@/app/locations/components/contact-view';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { useParams } from 'react-router-dom';

import AchievementsView from '@/app/locations/components/achievements-view';
import { AddressView } from '@/app/locations/components/address-view';
import { LocationActionBar } from '@/app/locations/components/location-action-bar';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import type { Park } from '@/types';

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
    <>
      {/* Park Name */}
      <h2 className='mx-4 mt-4'>
        {park.parkName}
      </h2>
      <AddressView park={park} />
      <ContactView park={park} />
      <AchievementsView park={park} stamp={stamp} />
      <LocationActionBar park={park} />
      <MiniTabs park={park} />
    </>
  );
}
