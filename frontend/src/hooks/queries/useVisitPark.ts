import { useLocation } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import { API_VISIT_HISTORY_URL, fetchGet, fetchPost } from '@/lib/fetch';
import type { ParkVisit } from '@/types/tables';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParks } from './useParks';

/** Gets the visit history for the current user */
const useVisitsHistory = () =>
  useQuery<ParkVisit[]>({
    queryKey: ['park_visits'],
    queryFn: () => fetchGet(`${API_VISIT_HISTORY_URL}`),
  });

/** Creates a park_visit record for the current user */
const useVisitMutation = () => {
  const { geopoint } = useLocation();
  return useMutation({
    mutationFn: (parkAbbreviation: string) =>
      fetchPost(`${API_VISIT_HISTORY_URL}/${parkAbbreviation}`, {
        longitude: geopoint?.longitude,
        latitude: geopoint?.latitude,
        inaccuracyRadius: geopoint?.inaccuracyRadius,
      }),
    onError: (error) => {
      dbg('ERROR', 'useVisitMutation', error);
    },
  });
};

/** Marks a park as visited for today */
export const useVisitPark = () => {
  const query = useVisitsHistory();
  const mutation = useVisitMutation();
  const { data: parks } = useParks();

  const mutate = (parkAbbreviation: string) => {
    dbg('MUTATE', 'useVisitPark', `visiting park ${parkAbbreviation}`);

    // make sure we have the data to check
    if (query.isLoading || query.data === undefined || parks === undefined) {
      dbg('ERROR', 'useVisitPark', 'waiting on query for timecheck');
      return;
    }

    const park = parks.find((park) => park.abbreviation === parkAbbreviation);

    if (!park) {
      dbg('ERROR', 'useVisitPark', `park ${parkAbbreviation} not found`);
      return;
    }

    // check if we've visited the park in the last 24 hours
    const lastVisit = query.data.find((visit: ParkVisit) => visit.parkId === park.id);
    if (lastVisit && lastVisit.updatedAt > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      dbg('ERROR', 'useVisitPark', 'already visited the park in the last 24 hours');
      return;
    }

    mutation.mutate(parkAbbreviation, {
      onSuccess: () => {
        query.refetch();
      },
    });
  };

  return {
    ...query,
    ...mutation,
    mutate,
  };
};
