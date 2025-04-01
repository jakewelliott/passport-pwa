//
// RED ICONS
//

const RED_ICONS = [
    'Biking-Red',
    'Fishing-Red',
    'Hiking-Red',
    'HorsebackRiding-Red',
    'Paddling-Red',
    'Picnicking-Red',
    'RockClimbing-Red',
    'Swimming-Red',
] as const;

type RedIcons = (typeof RED_ICONS)[number];

const RED_ICONS_TOOLTIPS: Record<RedIcons, string> = {
    'Biking-Red': 'Biking',
    'Fishing-Red': 'Fishing',
    'Hiking-Red': 'Hiking',
    'HorsebackRiding-Red': 'Horseback Riding',
    'Paddling-Red': 'Paddling',
    'Picnicking-Red': 'Picnicking',
    'RockClimbing-Red': 'Rock Climbing',
    'Swimming-Red': 'Swimming',
};

//
// BLUE ICONS
//

const BLUE_ICONS = [
    'BoatRamp-Blue',
    'BoatRental-Blue',
    'Exhibits-Blue',
    'Playground-Blue',
    'VisitorCenter-Blue',
] as const;

type BlueIcons = (typeof BLUE_ICONS)[number];

const BLUE_ICONS_TOOLTIPS: Record<BlueIcons, string> = {
    'BoatRamp-Blue': 'Boat Ramp',
    'BoatRental-Blue': 'Boat Rental',
    'Exhibits-Blue': 'Exhibits',
    'Playground-Blue': 'Playground',
    'VisitorCenter-Blue': 'Visitor Center',
};

//
// GREEN ICONS
//

const GREEN_ICONS = [
    'CamperCabins-Green',
    'Camping-Green',
    'CanoeinCamping-Green',
    'EquestrianCamping-Green',
    'GroupCabins-Green',
    'GroupCamp-Green',
    'PrimitiveCabin-Green',
    'RVCamping-Green',
    'VacationCabin-Green',
] as const;

type GreenIcons = (typeof GREEN_ICONS)[number];

const GREEN_ICONS_TOOLTIPS: Record<GreenIcons, string> = {
    'CamperCabins-Green': 'Camper Cabins',
    'Camping-Green': 'Camping',
    'CanoeinCamping-Green': 'Canoe-in Camping',
    'EquestrianCamping-Green': 'Equestrian Camping',
    'GroupCabins-Green': 'Group Cabins',
    'GroupCamp-Green': 'Group Camping',
    'PrimitiveCabin-Green': 'Primitive Cabin',
    'RVCamping-Green': 'RV Camping',
    'VacationCabin-Green': 'Vacation Cabin',
};

//
// BLACK ICONS
//

const BLACK_ICONS = ['Camping-Black', 'PicnicShelter-Black'] as const;

type BlackIcons = (typeof BLACK_ICONS)[number];

const BLACK_ICONS_TOOLTIPS: Record<BlackIcons, string> = {
    'Camping-Black': 'Camping Sites',
    'PicnicShelter-Black': 'Picnic Shelter',
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
    '4WDBeach',
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
    '4WDBeach': '4WD Beach Access',
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
