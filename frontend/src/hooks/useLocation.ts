import { dbg } from '@/lib/debug';
import type { Geopoint } from '@/types';
import { useEffect, useState } from 'react';

interface LocationState {
  geopoint: Geopoint | null;
  error: string | null;
  isLoading: boolean;
}

export const useLocation = (spoof?: Geopoint) => {
  dbg('HOOK', 'useLocation');

  const [location, setLocation] = useState<LocationState>({
    geopoint: spoof ?? null,
    error: null,
    isLoading: !spoof,
  });

  useEffect(() => {
    dbg('EFFECT', 'useLocation', 'updating...');

    if (spoof) {
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
        setLocation((prev) => ({
          ...prev,
          error: error.message,
          isLoading: false,
        }));
        dbg('ERROR', 'useLocation', error);
      },
    );
  }, [spoof]);

  return location;
};
