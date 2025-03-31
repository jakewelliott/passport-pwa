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

export const RedIconsTooltips: Record<RedIcons, string> = {
    [RedIcons.Biking]: 'Biking',
    [RedIcons.Fishing]: 'Fishing',
    [RedIcons.Hiking]: 'Hiking',
    [RedIcons.HorsebackRiding]: 'HorsebackRiding',
    [RedIcons.Paddling]: 'Paddling',
    [RedIcons.Picnicking]: 'Picnicking',
    [RedIcons.RockClimbing]: 'RockClimbing',
    [RedIcons.Swimming]: 'Swimming',
};

export enum BlueIcons {
    BoatRamp = 'BoatRamp',
    BoatRental = 'BoatRental',
    Exhibits = 'Exhibits',
    Playground = 'Playground',
    VisitorCenter = 'VisitorCenter',
}

export const BlueIconsTooltips: Record<BlueIcons, string> = {
    [BlueIcons.BoatRamp]: 'Boat Ramp',
    [BlueIcons.BoatRental]: 'Boat Rental',
    [BlueIcons.Exhibits]: 'Exhibits',
    [BlueIcons.Playground]: 'Playground',
    [BlueIcons.VisitorCenter]: 'Visitor Center',
};

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

export const GreenIconsTooltips: Record<GreenIcons, string> = {
    [GreenIcons.CamperCabins]: 'Camper Cabins',
    [GreenIcons.Camping]: 'Camping',
    [GreenIcons.CanoeinCamping]: 'Canoe-in Camping',
    [GreenIcons.EquestrianCamping]: 'Equestrian Camping',
    [GreenIcons.GroupCabins]: 'Group Cabins',
    [GreenIcons.GroupCamp]: 'Group Camping',
    [GreenIcons.PrimitiveCabin]: 'Primitive Cabin',
    [GreenIcons.RVCamping]: 'RV Camping',
    [GreenIcons.VacationCabin]: 'Vacation Cabin',
};

export enum BlackIcons {
    Camping = 'Camping',
    PicnicShelter = 'PicnicShelter',
}

export const BlackIconsTooltips: Record<BlackIcons, string> = {
    [BlackIcons.Camping]: 'Camping Sites',
    [BlackIcons.PicnicShelter]: 'Picnic Shelter',
};

export enum TrailIconEnum {
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
    WaterSpigot = 'WaterSpigot',
}

export const BlankIconsTooltips: Record<TrailIconEnum, string> = {
    [TrailIconEnum.FourWDBeach]: '4WD Beach Access',
    [TrailIconEnum.Accessible]: 'Accessible Facilities',
    [TrailIconEnum.Amphiteater]: 'Amphitheater',
    [TrailIconEnum.BackpackCamping]: 'Backpack Camping',
    [TrailIconEnum.Bathhouse]: 'Bathhouse',
    [TrailIconEnum.Biking]: 'Biking Trails',
    [TrailIconEnum.BoatRamp]: 'Boat Ramp',
    [TrailIconEnum.Boating]: 'Boating Activities',
    [TrailIconEnum.CamperCabin]: 'Camper Cabin',
    [TrailIconEnum.Camping]: 'Camping Area',
    [TrailIconEnum.DumpStation]: 'Dump Station',
    [TrailIconEnum.ElectricHookup]: 'Electric Hookup',
    [TrailIconEnum.ElectricWaterHookups]: 'Electric and Water Hookups',
    [TrailIconEnum.EquestrianCamping]: 'Equestrian Camping',
    [TrailIconEnum.Firewood]: 'Firewood Available',
    [TrailIconEnum.Fishing]: 'Fishing Opportunities',
    [TrailIconEnum.GroupCamp]: 'Group Camping Area',
    [TrailIconEnum.Hiking]: 'Hiking Trails',
    [TrailIconEnum.HorseTrailerParking]: 'Horse Trailer Parking',
    [TrailIconEnum.HorsebackRiding]: 'Horseback Riding',
    [TrailIconEnum.Hospital]: 'Nearby Hospital',
    [TrailIconEnum.IE_Exhibits]: 'Information Exhibits',
    [TrailIconEnum.Information]: 'Information Center',
    [TrailIconEnum.Marina]: 'Marina Facilities',
    [TrailIconEnum.PaddleInCamping]: 'Paddle-In Camping',
    [TrailIconEnum.Paddling]: 'Paddling Activities',
    [TrailIconEnum.ParkGate]: 'Park Entrance Gate',
    [TrailIconEnum.Picnic]: 'Picnic Area',
    [TrailIconEnum.PicnicShelter]: 'Picnic Shelter',
    [TrailIconEnum.PointofInterest]: 'Point of Interest',
    [TrailIconEnum.PrimitiveCabin]: 'Primitive Cabin',
    [TrailIconEnum.Restroom]: 'Restroom Facilities',
    [TrailIconEnum.RockClimbing]: 'Rock Climbing',
    [TrailIconEnum.SewerHookup]: 'Sewer Hookup',
    [TrailIconEnum.Swimming]: 'Swimming Area',
    [TrailIconEnum.TRACKTrail]: 'TRACK Trail',
    [TrailIconEnum.TentTrailerCamping]: 'Tent and Trailer Camping',
    [TrailIconEnum.VacationCabin]: 'Vacation Cabin',
    [TrailIconEnum.ViewingSymbol]: 'Viewing Area',
    [TrailIconEnum.VisitorCenter]: 'Visitor Center',
    [TrailIconEnum.WaterHookup]: 'Water Hookup',
    [TrailIconEnum.WaterSpigot]: 'Water Spigot',
};

export enum BlazeIcons {
    FBSTBlaze = 'FBST-Blaze',
    FFSTBlaze = 'FFST-Blaze',
    HGSTBlaze = 'HGST-Blaze',
    MSTBlaze = 'MST-Blaze',
    YSTBlaze = 'YST-Blaze',
}

export const BlazeIconsTooltips: Record<BlazeIcons, string> = {
    [BlazeIcons.FFSTBlaze]: 'Fonta Flora State Trail',
    [BlazeIcons.FBSTBlaze]: 'French Broad River State Trail',
    [BlazeIcons.HGSTBlaze]: 'Hickory Nut Gorge State Trail',
    [BlazeIcons.MSTBlaze]: 'Mountains-to-Sea State Trail',
    [BlazeIcons.YSTBlaze]: 'Yadkin River State Trail',
};

// TODO: ADAM: i had to remove the tooltip logic because it was causing the test to fail
// i'm not sure why, ill replace it jake

export type ParkIconEnum = RedIcons | BlueIcons | GreenIcons | BlackIcons | BlazeIcons;

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
