import { useState } from 'react';
import { LocationTabBar } from '@/components/tabs/locations/tab-bar';
import { LocationContact } from '@/components/tabs/locations/contact';
import { LocationActionBar } from '@/components/tabs/locations/action-bar';
import { LocationDetails } from '@/components/tabs/locations/details-tab';
import { PhotoGallery } from '@/components/tabs/locations/photos-tab';
import { LocationNotes } from '@/components/tabs/locations/notes-tab';
import { Park } from '@/lib/mock/types';

export default function LocationDetail() {
  const [choice, setChoice] = useState(0);
  const [park, setPark] = useState<Park>({
    name: 'Sample Data',
    address: [
      {
        name: 'Main Address:',
        addressLineOne: '1234 Main St',
        city: 'Raleigh',
        state: 'NC',
        zip: '27606',
      },
      {
        name: 'Secondary Address:',
        addressLineOne: '1234 Main St',
        city: 'Raleigh',
        state: 'NC',
        zip: '27606',
      },
    ],
    coordinates: { latitude: 35.2023, longitude: -78.9761 },
    phone: '(555) 555-5555',
    email: 'email@ncparks.gov',
    website: 'ncparks.gov',
    stamp: {
      time: '1/1/25',
      method: 'manual',
    },
    bucketList: {
      text: 'random bucket list item',
      status: false,
    },
    established: '2003',
    landmark: 'My House',
    youCanFind: 'My items',
    trails: 'The driveway',
    parkIcons: ['Paddling-Red.svg', 'RVCamping-Green.svg', 'Playground-Blue.svg'],
    parkPhotos: [
      { url: '/photos/CABE.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
      { url: '/photos/CACR.jpg' },
    ],
    parkNotes: '',
  });

  const handleChoiceChange = (newChoice: number) => {
    setChoice(newChoice);
  };

  const handleSaveNotes = (notes: string) => {
    setPark((prevPark) => ({
      ...prevPark,
      parkNotes: notes,
    }));
  };

  return (
    <>
      <LocationContact park={park} />
      <LocationActionBar park={park} />
      <LocationTabBar choice={choice} onChoiceChange={handleChoiceChange} />
      {choice === 0 && <LocationDetails park={park} />}
      {choice === 1 && <PhotoGallery photos={park.parkPhotos} />}
      {choice === 2 && <LocationNotes park={park.abbreviation} onSaveNotes={handleSaveNotes} />}
    </>
  );
}
