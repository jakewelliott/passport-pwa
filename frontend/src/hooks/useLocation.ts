import { dbg } from '@/lib/debug';
import type { Geopoint } from '@/types';
import { useEffect, useState } from 'react';

interface LocationState {
  geopoint: Geopoint | null;
  error: string | null;
  isLoading: boolean;
}

// To spoof location, set SPOOF_LOCATION to a Geopoint object
// To use real location, set SPOOF_LOCATION to null

const SPOOF_LOCATION: Geopoint = {
  latitude: 35.87,
  longitude: -78.76,
  inaccuracyRadius: 0.0001,
};

// const SPOOF_LOCATION = null;

export const useLocation = () => {
  dbg('HOOK', 'useLocation');

  const [location, setLocation] = useState<LocationState>({
    geopoint: SPOOF_LOCATION,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    dbg('EFFECT', 'useLocation', 'updating...');

    if (SPOOF_LOCATION !== null) {
      dbg('EFFECT', 'useLocation', 'spoofing location');
      return;
    }

    if (!navigator.geolocation) {
      dbg('EFFECT', 'useLocation', 'geolocation not supported');
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          geopoint: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            inaccuracyRadius: position.coords.accuracy / 87000,
          },
          error: null,
          isLoading: false,
        });
        dbg('EFFECT', 'useLocation', 'location updated');
      },
      (error) => {
        setLocation({
          geopoint: null,
          error: error.message,
          isLoading: false,
        });
        dbg('ERROR', 'useLocation', error);
      },
    );
  }, []);

  return location;
};
