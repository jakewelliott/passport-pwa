import { API_PARKGEO_URL, API_PARKS_URL, fetchGet } from '@/lib/fetch';
import type { Park, ParkGeoData } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useParks = () => {
    const query = useQuery<Park[]>({
        queryKey: ['parks'],
        queryFn: async () => await fetchGet(API_PARKS_URL),
    });

    const parkIdToAbbreviation = (parkId: number) => {
        return query.data?.find((park) => park.id === parkId)?.abbreviation;
    };

    const parkAbbreviationToId = (parkAbbreviation: string) => {
        return query.data?.find((park) => park.abbreviation === parkAbbreviation)?.id;
    };

    return { ...query, parkIdToAbbreviation, parkAbbreviationToId };
};

export const usePark = (parkAbbreviation: string) => {
    const hook = useParks();
    const park = hook.data?.find((park) => park.abbreviation === parkAbbreviation);
    return { ...hook, data: park };
};

export const useParksGeo = () => {
    return useQuery<ParkGeoData[]>({
        queryKey: ['parkGeo'],
        queryFn: async () => await fetchGet(API_PARKGEO_URL),
    });
};
