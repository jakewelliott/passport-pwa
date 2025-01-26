import { useEffect } from 'react';
import { useTitle } from '../../context/title-context';
import ListRow from '../../components/common/list-row';
import { Link } from 'react-router-dom';

export default function Locations() {
  const { setTitle } = useTitle();
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
  ];

  useEffect(() => {
    setTitle('Locations');
  }, [setTitle]);

  return (
    <>
      {parks.map((park, index) => (
        <div className='m-3' key={index}>
          <Link
            to={`/locations/location-detail/${park.abbreviation}`}
            className='text-supporting_inactiveblue no-underline'
          >
            <ListRow>
              <div className='flex flex-col gap-1'>
                <h3>{park.name}</h3>
                <p>{park.address[0].city}, NC</p>
              </div>
            </ListRow>
          </Link>
        </div>
      ))}
    </>
  );
}
