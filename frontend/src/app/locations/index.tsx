import ListRow from '@/components/list-row';
import { useParks } from '@/hooks/queries/useParks';
import { dbg } from '@/lib/debug';
import type { Park } from '@/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoadingPlaceholder = () => {
  // TODO: add a loading placeholder (blank grey boxes)
  return <div data-testid='loading-placeholder'>Loading...</div>;
};

const Row = ({ park }: { park: Park }) => {
  const address = park.addresses?.[0]
    ? `${park.addresses?.[0].city}, ${park.addresses?.[0].state}`
    : 'Address not available';

  return (
    <ListRow>
      <div className='flex flex-col gap-1'>
        <h3>{park.parkName}</h3>
        <p>{address}</p>
      </div>
    </ListRow>
  );
};

export default function LocationsScreen() {
  useEffect(() => {
    window.scrollTo(0, 500); // Set the default scroll position to 50px down the page
  }, []);
  dbg('RENDER', 'Locations');
  const { data: parks, isLoading, isError, error } = useParks();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!parks || parks.length === 0) return <div>No parks found</div>;

  const filteredParks = parks.filter(
    (park) =>
      park.parkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (park.addresses?.length > 0 && park.addresses?.[0].city.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <>
      <div className='relative mx-3 mt-3'>
        <input
          type='text'
          placeholder='Search parks...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-lg border border-system_gray p-3 pr-7 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        />
        {searchQuery && (
          <button
            type='button'
            onClick={() => setSearchQuery('')}
            className='-translate-y-1/2 absolute top-1/2 right-3 transform text-system_gray hover:text-secondary_darkteal'
            aria-label='Clear search'
          >
            &times;
          </button>
        )}
      </div>
      {filteredParks
        .sort((a, b) => a.parkName.localeCompare(b.parkName))
        .map((park) => (
          <div className='m-3' key={park.id} data-testid={'park'}>
            <Link to={`/locations/${park.abbreviation}`} className='text-supporting_inactiveblue no-underline'>
              <Row park={park} />
            </Link>
          </div>
        ))}
    </>
  );
}
