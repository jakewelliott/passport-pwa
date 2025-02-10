import { LocationMiniTabBar } from '@/components/tabs/locations/minitab-bar';
import { LocationContact } from '@/components/tabs/locations/contact';
import { LocationActionBar } from '@/components/tabs/locations/action-bar';
import { DetailsMiniTab } from '@/components/tabs/locations/details-minitab';
import { PhotoGalleryMiniTab } from '@/components/tabs/locations/photos-minitab';
import { NotesMiniTab } from '@/components/tabs/locations/notes-minitab';
import { useParams } from 'react-router-dom';
import { usePark } from '@/hooks/queries/useParks';
import { LoadingPlaceholder } from '@/components/loading-placeholder';

export default function DetailTabs() {
  const { abbreviation } = useParams();
  const parkAbbreviation = abbreviation as Uppercase<string>;
  const { data: park, isLoading } = usePark(parkAbbreviation);

  if (isLoading || !park) return <LoadingPlaceholder />;

  return (
    <>
      <LocationContact park={park} />
      <LocationActionBar park={park} />
      <LocationMiniTabBar>
        <DetailsMiniTab park={park} />
        <PhotoGalleryMiniTab photos={park.parkPhotos} />
        <NotesMiniTab abbreviation={park.abbreviation} />
      </LocationMiniTabBar>
    </>
  );
}
