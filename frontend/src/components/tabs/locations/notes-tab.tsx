import type React from 'react';
import { useState, useEffect } from 'react';
import RoundedButton from '../../common/rounded-button';

interface StampDetails {
  time: string;
  method: string;
}

interface BucketListItemDetails {
  text: string;
  status: boolean;
}

interface Address {
  name: string;
  addressLineOne: string;
  city: string;
  state: string;
  zip: string;
}

interface ParkPhoto {
  url: string;
  caption?: string;
}

interface Park {
  name: string;
  address: Address[];
  coordinates: string;
  phone: string;
  email: string;
  website: string;
  stamp?: StampDetails;
  bucketList?: BucketListItemDetails;
  established?: string;
  landmark?: string;
  youCanFind?: string;
  trails?: string;
  parkIcons: string[];
  parkPhotos: ParkPhoto[];
  parkNotes: string;
}

interface LocationNotesProps {
  park: Park;
  onSaveNotes: (notes: string) => void;
}

export const LocationNotes: React.FC<LocationNotesProps> = ({ park, onSaveNotes }) => {
  const [notes, setNotes] = useState(park.parkNotes || '');

  useEffect(() => {
    setNotes(park.parkNotes || '');
  }, [park.parkNotes]);

  return (
    <div className='flex h-full flex-col'>
      <textarea
        className='h-72 w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder='Add some personal notes about this park!'
      />
      <div
        className='flex justify-center p-3'
        onClick={() => {
          onSaveNotes(notes);
        }}
      >
        <RoundedButton title={'Save'} />
      </div>
    </div>
  );
};
