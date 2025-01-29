import type { ParkAbbreviation } from '@/lib/mock/types';

export const stampSVG = (code: ParkAbbreviation) => `/public/stamps/${code}.svg`;
