import type { Trail } from '@/types';
import { trails } from './tables/index';

export const GetTrail = (id: number): Trail => {
    const park = trails.find((trail: Trail) => trail.id === id);
    if (!park) throw new Error(`Trail not found: ${id}`);
    return park;
};
export const GetAllTrails = (): Trail[] => {
    return trails.map((trail) => ({
        ...trail,
        icons: trail.icons.map((iconId) => iconId),
    }));
};
