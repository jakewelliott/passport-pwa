import { useState } from 'react';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

export const BucketListItem = () => {
  const [park, setPark] = useState({
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
    coordinates: '35.2023, -78.9761',
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
      { url: './photos/CABE.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
      { url: './photos/CACR.jpg' },
    ],
    parkNotes: '',
  });

  return (
    <div className='my-2.5 flex items-start'>
      {park.bucketList.status ? (
        <FaRegCheckSquare size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
      ) : (
        <FaRegSquare size={'24px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '3px' }} />
      )}
      <div className='flex w-full flex-col justify-center'>
        <p>Participate</p>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <p className='p-mini text-main_green'>Raleigh</p>
          <p className='p-mini'>1/1/2025</p>
        </div>
      </div>
    </div>
  );
};
