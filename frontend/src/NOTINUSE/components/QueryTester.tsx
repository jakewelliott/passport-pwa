import { useState } from 'react';
import { useParks, usePark } from '../hooks/useParks';
import { useStamps, useCollectStamp } from '../hooks/useStamps';
import { useUserStamps } from '../hooks/useUser';

export const QueryTester = () => {
  const [selectedParkId, setSelectedParkId] = useState<number | null>(null);
  // Using a hardcoded userId for demo purposes
  const userId = 1;

  const { data: parks, isLoading: parksLoading } = useParks();
  const { data: selectedPark } = usePark(selectedParkId ?? 0);
  const { data: parkStamps } = useStamps(selectedParkId ?? 0);
  // const { data: user } = useUser(userId);
  const { data: userStamps } = useUserStamps(userId);
  const collectStamp = useCollectStamp();

  if (parksLoading) return <div>Loading parks...</div>;

  return (
    <div className='p-4'>
      <h1 className='mb-4 font-bold text-2xl'>Query Test Page</h1>

      {/* Parks List */}
      <div className='mb-6'>
        <h2 className='mb-2 font-semibold text-xl'>Parks</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {parks?.map((park) => (
            <div
              key={park.id}
              className='cursor-pointer rounded border p-4 hover:bg-gray-50'
              onClick={() => setSelectedParkId(park.id)}
              onKeyUp={(e) => e.key === 'Enter' && setSelectedParkId(park.id)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedParkId(park.id)}
            >
              <h3 className='font-semibold'>{park.name}</h3>
              <p>{park.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Park Details */}
      {selectedPark && (
        <div className='mb-6'>
          <h2 className='mb-2 font-semibold text-xl'>Selected Park Details</h2>
          <div className='rounded border p-4'>
            <h3 className='font-semibold'>{selectedPark.name}</h3>
            <p>{selectedPark.description}</p>
            <p>
              Location: {selectedPark.latitude}, {selectedPark.longitude}
            </p>
          </div>
        </div>
      )}

      {/* Park Stamps */}
      {parkStamps && (
        <div className='mb-6'>
          <h2 className='mb-2 font-semibold text-xl'>Park Stamps</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {parkStamps.map((stamp) => (
              <div key={stamp.id} className='rounded border p-4'>
                <h3 className='font-semibold'>{stamp.name}</h3>
                <p>{stamp.description}</p>
                <button
                  type='button'
                  className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                  onClick={() =>
                    collectStamp.mutate({
                      parkId: selectedParkId ?? 0,
                      stampId: stamp.id,
                    })
                  }
                >
                  Collect Stamp
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User's Collected Stamps */}
      {userStamps && (
        <div>
          <h2 className='mb-2 font-semibold text-xl'>Your Collected Stamps</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {userStamps.map((stamp) => (
              <div key={stamp.id} className='rounded border p-4'>
                <h3 className='font-semibold'>{stamp.name}</h3>
                <p>{stamp.description}</p>
                <p className='text-gray-500 text-sm'>Collected: {stamp.dateCollected}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
