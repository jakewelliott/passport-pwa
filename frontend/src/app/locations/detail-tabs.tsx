import { useEffect, useState } from 'react';
import { LocationTabBar } from '@/components/tabs/locations/tab-bar';
import { LocationContact } from '@/components/tabs/locations/contact';
import { LocationActionBar } from '@/components/tabs/locations/action-bar';
import { LocationDetails } from '@/components/tabs/locations/details-tab';
import { PhotoGallery } from '@/components/tabs/locations/photos-tab';
import { LocationNotes } from '@/components/tabs/locations/notes-tab';
import type { Park } from '@/lib/mock/types';
import { useParams } from 'react-router-dom';
import { usePark } from '@/hooks/queries/useParks';

const LoadingPlaceholder = () => {
  // TODO: add a loading placeholder (blank grey boxes)
  return <div>Loading...</div>;
};

export default function DetailTabs() {
  const [choice, setChoice] = useState(0);
  const { abbreviation } = useParams();
  const parkAbbreviation = abbreviation as Uppercase<string>;
  console.log(parkAbbreviation);
  const { data: park, isLoading } = usePark(parkAbbreviation);

  console.log(park);
  console.log(isLoading);

  if (isLoading || !park) return <LoadingPlaceholder />;

  const handleChoiceChange = (newChoice: number) => {
    setChoice(newChoice);
  };

  return (
    <>
      <LocationContact park={park} />
      <LocationActionBar park={park} />
      <LocationTabBar choice={choice} onChoiceChange={handleChoiceChange} />
      {choice === 0 && <LocationDetails park={park} />}
      {choice === 1 && <PhotoGallery photos={park.parkPhotos} />}
      {choice === 2 && <LocationNotes park_code={park.abbreviation} />}
    </>
  );
}
