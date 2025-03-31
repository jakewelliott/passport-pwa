//
// RED ICONS
//

const RED_ICONS = [
    'Biking',
    'Fishing',
    'Hiking',
    'HorsebackRiding',
    'Paddling',
    'Picnicking',
    'RockClimbing',
    'Swimming',
] as const;

type RedIcons = (typeof RED_ICONS)[number];

const RED_ICONS_TOOLTIPS: Record<RedIcons, string> = {
    Biking: 'Biking',
    Fishing: 'Fishing',
    Hiking: 'Hiking',
    HorsebackRiding: 'Horseback Riding',
    Paddling: 'Paddling',
    Picnicking: 'Picnicking',
    RockClimbing: 'Rock Climbing',
    Swimming: 'Swimming',
};

//
// BLUE ICONS
//

const BLUE_ICONS = ['BoatRamp', 'BoatRental', 'Exhibits', 'Playground', 'VisitorCenter'] as const;

type BlueIcons = (typeof BLUE_ICONS)[number];

const BLUE_ICONS_TOOLTIPS: Record<BlueIcons, string> = {
    BoatRamp: 'Boat Ramp',
    BoatRental: 'Boat Rental',
    Exhibits: 'Exhibits',
    Playground: 'Playground',
    VisitorCenter: 'Visitor Center',
};

//
// GREEN ICONS
//

const GREEN_ICONS = [
    'CamperCabins',
    'Camping',
    'CanoeinCamping',
    'EquestrianCamping',
    'GroupCabins',
    'GroupCamp',
    'PrimitiveCabin',
    'RVCamping',
    'VacationCabin',
] as const;

type GreenIcons = (typeof GREEN_ICONS)[number];

const GREEN_ICONS_TOOLTIPS: Record<GreenIcons, string> = {
    CamperCabins: 'Camper Cabins',
    Camping: 'Camping',
    CanoeinCamping: 'Canoe-in Camping',
    EquestrianCamping: 'Equestrian Camping',
    GroupCabins: 'Group Cabins',
    GroupCamp: 'Group Camping',
    PrimitiveCabin: 'Primitive Cabin',
    RVCamping: 'RV Camping',
    VacationCabin: 'Vacation Cabin',
};

//
// BLACK ICONS
//

const BLACK_ICONS = ['Camping', 'PicnicShelter'] as const;

type BlackIcons = (typeof BLACK_ICONS)[number];

const BLACK_ICONS_TOOLTIPS: Record<BlackIcons, string> = {
    Camping: 'Camping Sites',
    PicnicShelter: 'Picnic Shelter',
};

//
// BLAZE ICONS
//

const BLAZE_ICONS = ['FBST-Blaze', 'FFST-Blaze', 'HGST-Blaze', 'MST-Blaze', 'YST-Blaze'] as const;

type BlazeIcons = (typeof BLAZE_ICONS)[number];

const BLAZE_ICONS_TOOLTIPS: Record<BlazeIcons, string> = {
    'FBST-Blaze': 'French Broad State Trail',
    'FFST-Blaze': 'Fontana Lake State Trail',
    'HGST-Blaze': 'Hickory Nut Gorge State Trail',
    'MST-Blaze': 'Mountains-to-Sea State Trail',
    'YST-Blaze': 'Yadkin State Trail',
};

//
// TRAIL ICONS
//

const TRAIL_ICONS = [
    'FourWDBeach',
    'Accessible',
    'Amphiteater',
    'BackpackCamping',
    'Bathhouse',
    'Biking',
    'BoatRamp',
    'Boating',
    'CamperCabin',
    'Camping',
    'DumpStation',
    'ElectricHookup',
    'ElectricWaterHookups',
    'EquestrianCamping',
    'Firewood',
    'Fishing',
    'GroupCamp',
    'Hiking',
    'HorseTrailerParking',
    'HorsebackRiding',
    'Hospital',
    'IE_Exhibits',
    'Information',
    'Marina',
    'PaddleInCamping',
    'Paddling',
    'ParkGate',
    'Picnic',
    'PicnicShelter',
    'PointofInterest',
    'PrimitiveCabin',
    'Restroom',
    'RockClimbing',
    'SewerHookup',
    'Swimming',
    'TRACKTrail',
    'TentTrailerCamping',
    'VacationCabin',
    'ViewingSymbol',
    'VisitorCenter',
    'WaterHookup',
    'WaterSpigot',
] as const;

type TrailIcon = (typeof TRAIL_ICONS)[number];

const TRAIL_ICONS_TOOLTIPS: Record<TrailIcon, string> = {
    FourWDBeach: '4WD Beach Access',
    Accessible: 'Accessible Facilities',
    Amphiteater: 'Amphitheater',
    BackpackCamping: 'Backpack Camping',
    Bathhouse: 'Bathhouse',
    Biking: 'Biking Trails',
    BoatRamp: 'Boat Ramp',
    Boating: 'Boating Activities',
    CamperCabin: 'Camper Cabin',
    Camping: 'Camping Area',
    DumpStation: 'Dump Station',
    ElectricHookup: 'Electric Hookup',
    ElectricWaterHookups: 'Electric and Water Hookups',
    EquestrianCamping: 'Equestrian Camping',
    Firewood: 'Firewood Available',
    Fishing: 'Fishing Opportunities',
    GroupCamp: 'Group Camping Area',
    Hiking: 'Hiking Trails',
    HorseTrailerParking: 'Horse Trailer Parking',
    HorsebackRiding: 'Horseback Riding',
    Hospital: 'Nearby Hospital',
    IE_Exhibits: 'IE Exhibits',
    Information: 'Information Center',
    Marina: 'Marina Facilities',
    PaddleInCamping: 'Paddle-In Camping',
    Paddling: 'Paddling',
    ParkGate: 'Park Gate',
    Picnic: 'Picnic',
    PicnicShelter: 'Picnic Shelter',
    PointofInterest: 'Point of Interest',
    PrimitiveCabin: 'Primitive Cabin',
    Restroom: 'Restroom',
    RockClimbing: 'Rock Climbing',
    SewerHookup: 'Sewer Hookup',
    Swimming: 'Swimming',
    TRACKTrail: 'TRACK Trail',
    TentTrailerCamping: 'Tent and Trailer Camping',
    VacationCabin: 'Vacation Cabin',
    ViewingSymbol: 'Viewing Area',
    VisitorCenter: 'Visitor Center',
    WaterHookup: 'Water Hookup',
    WaterSpigot: 'Water Spigot',
};

//
// PARK ICONS (combined)
//

type ParkIcon = RedIcons | BlueIcons | GreenIcons | BlackIcons | BlazeIcons;

const PARK_ICONS_TOOLTIPS: Record<ParkIcon, string> = {
    ...RED_ICONS_TOOLTIPS,
    ...BLACK_ICONS_TOOLTIPS,
    ...BLUE_ICONS_TOOLTIPS,
    ...GREEN_ICONS_TOOLTIPS,
    ...BLAZE_ICONS_TOOLTIPS,
};

//
// EXPORTS
//

export { PARK_ICONS_TOOLTIPS, TRAIL_ICONS_TOOLTIPS };
export type { ParkIcon, TrailIcon };
