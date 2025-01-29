import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListRow from '../../components/common/list-row';
import { a11yOnClick } from '@/lib/a11y';

export const MyNotes = () => {
  const [generalNotes, setGeneralNotes] = useState('');
  const navigate = useNavigate();
  const parks = [
    {
      name: 'Sample Data',
      abbreviation: 'ABCD',
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
    },
    {
      name: 'Sample Data',
      abbreviation: 'ABCD',
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
    },
    {
      name: 'Sample Data',
      abbreviation: 'ABCD',
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
      parkNotes: 'heyyo',
    },
    {
      name: 'Sample Data',
      abbreviation: 'ABCD',
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
      parkNotes:
        ' this is some super lajnfiawlrbjhvkjg hcfjtgfkgvkjhvkyufvvvvvvvv vvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv h hvhvhvhvhvhvhvhvhvhvhvhvhvhvhvhvhv hvhvhvhvhvhvhvhvhvhvhvhvhvhvhvhvhvhvh vhvhvhvhvhvhvhvhvhvhvhvhvhvhv hvhvhvhvhvhvhvhvhvhvhvhhvhv',
    },
  ];
  const parksWithNotes = parks.filter((park) => park.parkNotes && park.parkNotes.trim() !== '');

  useEffect(() => {
    const savedNotes = localStorage.getItem('generalNotes');
    if (savedNotes) {
      setGeneralNotes(savedNotes);
    }
  }, []);

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='space-y-4'>
        <div {...a11yOnClick(() => navigate('/more/my-notes/general-notes'))} className='cursor-pointer'>
          <ListRow>
            <div className='flex flex-col gap-1'>
              <h3>General Notes</h3>
              <p className='mb-2 text-gray-500 text-sm'>Last updated: Not available</p>
              <p
                className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words'
                style={{ hyphens: 'auto' }}
              >
                {generalNotes || 'No general notes yet'}
              </p>
            </div>
          </ListRow>
        </div>

        {/* Park Notes section */}
        {parksWithNotes.length === 0 ? (
          <p className='text-gray-600'>No park notes found.</p>
        ) : (
          parksWithNotes.map((park, index) => (
            <div
              key={index}
              {...a11yOnClick(() => navigate(`/locations/location-detail/${park.abbreviation}?tab=notes`))}
              className='cursor-pointer'
            >
              <ListRow>
                <div className='flex flex-col gap-1'>
                  <h3>{park.name}</h3>
                  <p>{park.address[0].city}</p>
                  <p className='mb-2 text-gray-500 text-sm'>Last updated: Not available</p>
                  <p
                    className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words'
                    style={{ hyphens: 'auto' }}
                  >
                    {park.parkNotes}
                  </p>
                </div>
              </ListRow>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
