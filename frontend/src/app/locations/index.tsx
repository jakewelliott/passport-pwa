import ListRow from '@/components/list-row';
import { Link } from 'react-router-dom';
import { useParks } from '@/hooks/queries/useParks';

const LoadingPlaceholder = () => {
  // TODO: add a loading placeholder (blank grey boxes)
  return <div data-testid='loading-placeholder'>Loading...</div>;
};

export default function Locations() {
  const { data: parks, isLoading, isError, error } = useParks();

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!parks || parks.length === 0) return <div>No parks found</div>;

  return (
    <>
      {parks.map((park) => (
        <div className='m-3' key={park.abbreviation}>
          <Link
            to={`/locations/${park.abbreviation}`}
            className='text-supporting_inactiveblue no-underline'
          >
            <ListRow>
              <div className='flex flex-col gap-1'>
                <h3>{park.parkName}</h3>
                <p>{park.city}, {park.state}</p>
              </div>
            </ListRow>
          </Link>
        </div>
      ))}
    </>
  );
}