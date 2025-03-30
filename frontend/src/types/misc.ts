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
    WaterSpigot = 'WaterSpigot',
}

export const BlankIconsTooltips: Record<BlankIcons, string> = {
    [BlankIcons.FourWDBeach]: '4WD Beach Access',
    [BlankIcons.Accessible]: 'Accessible Facilities',
    [BlankIcons.Amphiteater]: 'Amphitheater',
    [BlankIcons.BackpackCamping]: 'Backpack Camping',
    [BlankIcons.Bathhouse]: 'Bathhouse',
    [BlankIcons.Biking]: 'Biking Trails',
    [BlankIcons.BoatRamp]: 'Boat Ramp',
    [BlankIcons.Boating]: 'Boating Activities',
    [BlankIcons.CamperCabin]: 'Camper Cabin',
    [BlankIcons.Camping]: 'Camping Area',
    [BlankIcons.DumpStation]: 'Dump Station',
    [BlankIcons.ElectricHookup]: 'Electric Hookup',
    [BlankIcons.ElectricWaterHookups]: 'Electric and Water Hookups',
    [BlankIcons.EquestrianCamping]: 'Equestrian Camping',
    [BlankIcons.Firewood]: 'Firewood Available',
    [BlankIcons.Fishing]: 'Fishing Opportunities',
    [BlankIcons.GroupCamp]: 'Group Camping Area',
    [BlankIcons.Hiking]: 'Hiking Trails',
    [BlankIcons.HorseTrailerParking]: 'Horse Trailer Parking',
    [BlankIcons.HorsebackRiding]: 'Horseback Riding',
    [BlankIcons.Hospital]: 'Nearby Hospital',
    [BlankIcons.IE_Exhibits]: 'Information Exhibits',
    [BlankIcons.Information]: 'Information Center',
    [BlankIcons.Marina]: 'Marina Facilities',
    [BlankIcons.PaddleInCamping]: 'Paddle-In Camping',
    [BlankIcons.Paddling]: 'Paddling Activities',
    [BlankIcons.ParkGate]: 'Park Entrance Gate',
    [BlankIcons.Picnic]: 'Picnic Area',
    [BlankIcons.PicnicShelter]: 'Picnic Shelter',
    [BlankIcons.PointofInterest]: 'Point of Interest',
    [BlankIcons.PrimitiveCabin]: 'Primitive Cabin',
    [BlankIcons.Restroom]: 'Restroom Facilities',
    [BlankIcons.RockClimbing]: 'Rock Climbing',
    [BlankIcons.SewerHookup]: 'Sewer Hookup',
    [BlankIcons.Swimming]: 'Swimming Area',
    [BlankIcons.TRACKTrail]: 'TRACK Trail',
    [BlankIcons.TentTrailerCamping]: 'Tent and Trailer Camping',
    [BlankIcons.VacationCabin]: 'Vacation Cabin',
    [BlankIcons.ViewingSymbol]: 'Viewing Area',
    [BlankIcons.VisitorCenter]: 'Visitor Center',
    [BlankIcons.WaterHookup]: 'Water Hookup',
    [BlankIcons.WaterSpigot]: 'Water Spigot',
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

export type ParkIconEnum = RedIcons | BlueIcons | GreenIcons | BlackIcons | BlazeIcons;

export type TrailIconEnum = BlankIcons;

export function getParkIconTooltip(icon: ParkIconEnum): string {
    const newIcon = icon.split('-').slice(0, -1).join('-');
    
    return (
        RedIconsTooltips[newIcon as RedIcons] ||
        BlueIconsTooltips[newIcon as BlueIcons] ||
        GreenIconsTooltips[newIcon as GreenIcons] ||
        BlackIconsTooltips[newIcon as BlackIcons] ||
        BlazeIconsTooltips[icon as BlazeIcons] ||
        icon
    );
}

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
