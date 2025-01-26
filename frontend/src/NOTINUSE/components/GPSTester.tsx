import { useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const GPSTester = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-6 font-bold text-2xl text-gray-800'>GPS Location Tester</h2>

      <button
        type='button'
        onClick={getCurrentLocation}
        disabled={loading}
        className='w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {loading ? 'Getting Location...' : 'Get Current Location'}
      </button>

      {error && <div className='mt-4 rounded-lg border border-red-400 bg-red-100 p-4 text-red-700'>Error: {error}</div>}

      {location && (
        <div className='mt-6 rounded-lg bg-gray-50 p-4'>
          <h3 className='mb-3 font-semibold text-gray-800 text-lg'>Current Location:</h3>
          <div className='space-y-2 text-gray-600'>
            <p>
              Latitude: <span className='font-mono'>{location.latitude}</span>
            </p>
            <p>
              Longitude: <span className='font-mono'>{location.longitude}</span>
            </p>
            <p>
              Accuracy: <span className='font-mono'>±{Math.round(location.accuracy)} meters</span>
            </p>
            <p>
              Timestamp: <span className='font-mono'>{new Date(location.timestamp).toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
