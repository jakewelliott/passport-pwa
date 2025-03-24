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

export enum BlankIcons {
  FourWDBeach = '4WDBeach',
  Accessible = 'Accessible',
  Amphiteater = 'Amphiteater',
  BackpackCamping = 'BackpackCamping',
  Bathhouse = 'Bathhouse',
  Biking = 'Biking',
  BoatRamp = 'BoatRamp',
  Boating = 'Boating',
  CamperCabin = 'CamperCabin',
  Camping = 'Camping',
  DumpStation = 'DumpStation',
  ElectricHookup = 'ElectricHookup',
  ElectricWaterHookups = 'ElectricWaterHookups',
  EquestrianCamping = 'EquestrianCamping',
  Firewood = 'Firewood',
  Fishing = 'Fishing',
  GroupCamp = 'GroupCamp',
  Hiking = 'Hiking',
  HorseTrailerParking = 'HorseTrailerParking',
  HorsebackRiding = 'HorsebackRiding',
  Hospital = 'Hospital',
  IE_Exhibits = 'IE_Exhibits',
  Information = 'Information',
  Marina = 'Marina',
  PaddleInCamping = 'PaddleInCamping',
  Paddling = 'Paddling',
  ParkGate = 'ParkGate',
  Picnic = 'Picnic',
  PicnicShelter = 'PicnicShelter',
  PointofInterest = 'PointofInterest',
  PrimitiveCabin = 'PrimitiveCabin',
  Restroom = 'Restroom',
  RockClimbing = 'RockClimbing',
  SewerHookup = 'SewerHookup',
  Swimming = 'Swimming',
  TRACKTrail = 'TRACKTrail',
  TentTrailerCamping = 'TentTrailerCamping',
  VacationCabin = 'VacationCabin',
  ViewingSymbol = 'ViewingSymbol',
  VisitorCenter = 'VisitorCenter',
  WaterHookup = 'WaterHookup',
  WaterSpigot = 'WaterSpigot'
}

export enum BlazeIcons {
  FBSTBlaze = 'FBST-Blaze',
  FFSTBlaze = 'FFST-Blaze',
  HGSTBlaze = 'HGST-Blaze',
  MSTBlaze = 'MST-Blaze',
  YSTBlaze = 'YST-Blaze',
}

export type ParkIconEnum = RedIcons | BlueIcons | GreenIcons | BlackIcons | BlazeIcons;

export type TrailIconEnum = BlankIcons;

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
