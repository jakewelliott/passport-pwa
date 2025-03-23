// Misc utility types that aren't standalone records in a table

export interface Geopoint {
  latitude: number;
  longitude: number;
  inaccuracyRadius: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Address {
  title: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  zipcode: number;
}

export enum RedIcons {
  Biking = 'Biking',
  Fishing = 'Fishing',
  Hiking = 'Hiking',
  HorsebackRiding = 'HorsebackRiding',
  Paddling = 'Paddling',
  Picnicking = 'Picnicking',
  RockClimbing = 'RockClimbing',
  Swimming = 'Swimming',
}

export enum BlueIcons {
  BoatRamp = 'BoatRamp',
  BoatRental = 'BoatRental',
  Exhibits = 'Exhibits',
  Playground = 'Playground',
  VisitorCenter = 'VisitorCenter',
}

export enum GreenIcons {
  CamperCabins = 'CamperCabins',
  Camping = 'Camping',
  CanoeinCamping = 'CanoeinCamping',
  EquestrianCamping = 'EquestrianCamping',
  GroupCabins = 'GroupCabins',
  GroupCamp = 'GroupCamp',
  PrimitiveCabin = 'PrimitiveCabin',
  RVCamping = 'RVCamping',
  VacationCabin = 'VacationCabin',
}

export enum BlackIcons {
  Camping = 'Camping',
  PicnicShelter = 'PicnicShelter',
}

export enum BlazeIcons {
  FBSTBlaze = 'FBST-Blaze',
  FFSTBlaze = 'FFST-Blaze',
  HGSTBlaze = 'HGST-Blaze',
  MSTBlaze = 'MST-Blaze',
  YSTBlaze = 'YST-Blaze',
}

// export enum ParkIcon {
//   Biking = 'Biking',
//   BoatRamp = 'BoatRamp',
//   BoatRental = 'BoatRental',
//   CamperCabins = 'CamperCabins',
//   Camping = 'Camping',
//   CanoeinCamping = 'CanoeinCamping',
//   EquestrianCamping = 'EquestrianCamping',
//   Exhibits = 'Exhibits',
//   FBSTBlaze = 'FBST-Blaze',
//   FFSTBlaze = 'FFST-Blaze',
//   Fishing = 'Fishing',
//   GroupCabins = 'GroupCabins',
//   GroupCamp = 'GroupCamp',
//   HGSTBlaze = 'HGST-Blaze',
//   Hiking = 'Hiking',
//   HorsebackRiding = 'HorsebackRiding',
//   MSTBlaze = 'MST-Blaze',
//   Paddling = 'Paddling',
//   PicnicShelter = 'PicnicShelter',
//   Picnicking = 'Picnicking',
//   Playground = 'Playground',
//   PrimitiveCabin = 'PrimitiveCabin',
//   RockClimbing = 'RockClimbing',
//   RVCamping = 'RVCamping',
//   Swimming = 'Swimming',
//   VacationCabin = 'VacationCabin',
//   VisitorCenter = 'VisitorCenter',
//   YSTBlaze = 'YST-Blaze',
// }

export type IconEmun = RedIcons | BlueIcons | GreenIcons | BlackIcons | BlazeIcons;

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
