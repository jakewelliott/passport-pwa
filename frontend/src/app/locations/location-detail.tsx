import { useEffect, useState } from 'react';
import { LocationTabBar } from '@/components/tabs/locations/tab-bar';
import { LocationContact } from '@/components/tabs/locations/contact';
import { LocationActionBar } from '@/components/tabs/locations/action-bar';
import { LocationDetails } from '@/components/tabs/locations/details-tab';
import { PhotoGallery } from '@/components/tabs/locations/photos-tab';
import { LocationNotes } from '@/components/tabs/locations/notes-tab';
import type { Park } from '@/lib/mock/types';
import { useParams, useSearchParams } from 'react-router-dom';
import { usePark } from '@/hooks/queries/useParks';

const LoadingPlaceholder = () => {
  // TODO: add a loading placeholder (blank grey boxes)
  return <div>Loading...</div>;
};

export default function LocationDetail() {
  const [searchParams] = useSearchParams();
  const [choice, setChoice] = useState(0);
  const { data: park, isLoading } = usePark(params.code);

  if (isLoading || !park) return <LoadingPlaceholder />;

  useEffect(() => {
    // Handle the tab query parameter
    const tab = searchParams.get('tab');
    if (tab === 'notes') {
      setChoice(2); // Index 2 corresponds to Notes tab
    }
  }, [searchParams]);

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
