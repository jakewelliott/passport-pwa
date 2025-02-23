import type { Park } from '@/lib/mock/types';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

const park: Park = {
  abbreviation: 'CABE',
  parkName: 'Sample Data',
  addresses: [
    {
      title: 'Secondary Address:',
      addressLineOne: '1234 Main St',
      city: 'Raleigh',
      state: 'NC',
      zipcode: 27606,
      addressLineTwo: '',
    },
    {
      title: 'Tertiary Address:',
      addressLineOne: '1234 Main St',
      city: 'Raleigh',
      state: 'NC',
      zipcode: 27606,
      addressLineTwo: '',
    },
  ],
  coordinates: { latitude: 35.2023, longitude: -78.9761, accuracy: 0 },
  phone: 5555555555,
  email: 'email@ncparks.gov',
  website: 'ncparks.gov',
  establishedYear: '2003',
  landmark: 'My House',
  youCanFind: 'My items',
  trails: 'The driveway',
  icons: [{ iconName: 'Paddling-Red.svg' }, { iconName: 'RVCamping-Green.svg' }, { iconName: 'Playground-Blue.svg' }],
  photos: [
    {
      photoPath: './photos/CABE.jpg',
      alt: '',
    },
    {
      photoPath: './photos/CACR.jpg',
      alt: '',
    },
    {
      photoPath: './photos/CACR.jpg',
      alt: '',
    },
  ],
  id: 0,
  bucketListItems: [],
};

export const BucketListItem = () => {
  const hasValidBucketListItem = park.bucketListItems?.[0]?.task?.length >= 0;
  return (
    <div className='my-2.5 flex items-start'>
      {hasValidBucketListItem ? (
        <FaRegCheckSquare
          data-testid='checked-icon'
          size={'24px'}
          strokeWidth={3}
          style={{ paddingRight: '5px', paddingTop: '3px' }}
        />
      ) : (
        <FaRegSquare
          data-testid='unchecked-icon'
          size={'24px'}
          strokeWidth={3}
          style={{ paddingRight: '5px', paddingTop: '3px' }}
        />
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
