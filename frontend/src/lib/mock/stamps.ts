import type { ParkCode } from "@/lib/mock/types";

export const stampURL = (code: ParkCode) => `/stamps/${code}.svg`;
