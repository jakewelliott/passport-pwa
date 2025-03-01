import { dbg } from '@/lib/debug';
import type { Geopoint } from '@/lib/mock/types';
import { useEffect, useState } from 'react';

interface LocationState {
  geopoint: {
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null;
  error: string | null;
  isLoading: boolean;
}

export const useLocation = (spoof?: Geopoint) => {
  const [location, setLocation] = useState<LocationState>({
    geopoint: spoof ?? null,
    error: null,
    isLoading: !spoof,
  });

  useEffect(() => {
    if (spoof) {
      dbg('HOOK', 'useLocation', 'spoofing location');
      return;
    }

    if (!navigator.geolocation) {
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
            accuracy: position.coords.accuracy / 87000,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          error: error.message,
          isLoading: false,
        }));
      },
    );
  }, [spoof]);

  return location;
};
