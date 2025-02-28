import { LocationActionBar } from '@/app/locations/components/action-bar';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationContact } from '@/app/locations/components/location-contact';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { useParams } from 'react-router-dom';

import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { usePark, useParkActivity } from '@/hooks/queries/useParks';
import { useUser } from '@/hooks/queries/useUser';

export default function DetailTabs() {
  const { abbreviation } = useParams();
  const parkAbbreviation = abbreviation as Uppercase<string>;
  const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: parkActivity, isLoading: isActivityLoading } =
    !isUserLoading && user?.role !== 'admin' ? useParkActivity(park?.id ?? 0) : { data: null, isLoading: false };
  if (isParkLoading || isActivityLoading || !park) return <LoadingPlaceholder />;
  return (
    <>
      <LocationContact park={park} parkActivity={parkActivity ?? undefined} />
      <LocationActionBar park={park} />
      <LocationMiniTabBar>
        <DetailsMiniTab park={park} />
        <PhotoGalleryMiniTab photos={park.photos} />
        <NotesMiniTab abbreviation={park.abbreviation} parkId={park.id} />
      </LocationMiniTabBar>
    </>
  );
}
