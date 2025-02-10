// import { useUser } from './queries/useUser';
// import type { ParkAbbreviation } from '@/lib/mock/types';

// export const useUserStamp = (code: ParkAbbreviation) => {
//   // re-use our query hooks whenever possible
//   const { data: user, isLoading } = useUser();

//   // return null if stamp not collected yet

//   const stamp = user?.stamps.find((stamp) => stamp.code === code) || null;

//   return { stamp, isLoading };
// };

export const useUserStamp = () => {
  return {stamp: null};
}