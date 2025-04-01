//
// PARK ICONS
//

export const RED_ICONS = [
    { iconName: 'Biking-Red', tooltip: 'Biking', extraText: '' },
    { iconName: 'Fishing-Red', tooltip: 'Fishing', extraText: '' },
    { iconName: 'Hiking-Red', tooltip: 'Hiking', extraText: '' },
    { iconName: 'HorsebackRiding-Red', tooltip: 'Horseback Riding', extraText: '' },
    { iconName: 'Paddling-Red', tooltip: 'Paddling', extraText: '' },
    { iconName: 'Picnicking-Red', tooltip: 'Picnicking', extraText: '' },
    { iconName: 'RockClimbing-Red', tooltip: 'Rock Climbing', extraText: '' },
    { iconName: 'Swimming-Red', tooltip: 'Swimming', extraText: '' },
] as const;

export const BLUE_ICONS = [
    { iconName: 'BoatRamp-Blue', tooltip: 'Boat Ramp', extraText: '' },
    { iconName: 'BoatRental-Blue', tooltip: 'Boat Rental', extraText: '' },
    { iconName: 'Exhibits-Blue', tooltip: 'Exhibits', extraText: '' },
    { iconName: 'Playground-Blue', tooltip: 'Playground', extraText: '' },
    { iconName: 'VisitorCenter-Blue', tooltip: 'Visitor Center', extraText: '' },
] as const;

export const GREEN_ICONS = [
    { iconName: 'CamperCabins-Green', tooltip: 'Camper Cabins', extraText: '' },
    { iconName: 'Camping-Green', tooltip: 'Camping', extraText: '' },
    { iconName: 'CanoeinCamping-Green', tooltip: 'Canoe-in Camping', extraText: '' },
    { iconName: 'EquestrianCamping-Green', tooltip: 'Equestrian Camping', extraText: '' },
    { iconName: 'GroupCabins-Green', tooltip: 'Group Cabins', extraText: '' },
    { iconName: 'GroupCamp-Green', tooltip: 'Group Camping', extraText: '' },
    { iconName: 'PrimitiveCabin-Green', tooltip: 'Primitive Cabin', extraText: '' },
    {
        iconName: 'RVCamping-Green',
        tooltip: 'RV Camping',
        extraText: 'has electric, water, AND/OR sewer hookups. Check with reservations website for available hookups',
    },
    { iconName: 'VacationCabin-Green', tooltip: 'Vacation Cabin', extraText: '' },
] as const;

export const BLACK_ICONS = [
    { iconName: 'Camping-Black', tooltip: 'Camping Sites', extraText: '' },
    { iconName: 'PicnicShelter-Black', tooltip: 'Picnic Shelter', extraText: '' },
] as const;

export const BLAZE_ICONS = [
    { iconName: 'FBST-Blaze', tooltip: 'French Broad State Trail', extraText: '' },
    { iconName: 'FFST-Blaze', tooltip: 'Fontana Lake State Trail', extraText: '' },
    { iconName: 'HGST-Blaze', tooltip: 'Hickory Nut Gorge State Trail', extraText: '' },
    { iconName: 'MST-Blaze', tooltip: 'Mountains-to-Sea State Trail', extraText: '' },
    { iconName: 'YRST-Blaze', tooltip: 'Yadkin River State Trail', extraText: '' },
] as const;

export const PARK_ICONS = [...RED_ICONS, ...BLUE_ICONS, ...GREEN_ICONS, ...BLACK_ICONS, ...BLAZE_ICONS] as const;

//
// TRAIL ICONS
//

export const TRAIL_ICONS = [
    { iconName: '4WDBeach', tooltip: '4WD Beach Access' },
    { iconName: 'Accessible', tooltip: 'Accessible Facilities' },
    { iconName: 'Amphiteater', tooltip: 'Amphitheater' },
    { iconName: 'BackpackCamping', tooltip: 'Backpack Camping' },
    { iconName: 'Bathhouse', tooltip: 'Bathhouse' },
    { iconName: 'Biking', tooltip: 'Biking Trails' },
    { iconName: 'BoatRamp', tooltip: 'Boat Ramp' },
    { iconName: 'Boating', tooltip: 'Boating Activities' },
    { iconName: 'CamperCabin', tooltip: 'Camper Cabin' },
    { iconName: 'Camping', tooltip: 'Camping Area' },
    { iconName: 'DumpStation', tooltip: 'Dump Station' },
    { iconName: 'ElectricHookup', tooltip: 'Electric Hookup' },
    { iconName: 'ElectricWaterHookups', tooltip: 'Electric and Water Hookups' },
    { iconName: 'EquestrianCamping', tooltip: 'Equestrian Camping' },
    { iconName: 'Firewood', tooltip: 'Firewood Available' },
    { iconName: 'Fishing', tooltip: 'Fishing Opportunities' },
    { iconName: 'GroupCamp', tooltip: 'Group Camping Area' },
    { iconName: 'Hiking', tooltip: 'Hiking Trails' },
    { iconName: 'HorseTrailerParking', tooltip: 'Horse Trailer Parking' },
    { iconName: 'HorsebackRiding', tooltip: 'Horseback Riding' },
    { iconName: 'Hospital', tooltip: 'Nearby Hospital' },
    { iconName: 'IE_Exhibits', tooltip: 'IE Exhibits' },
    { iconName: 'Information', tooltip: 'Information Center' },
    { iconName: 'Marina', tooltip: 'Marina Facilities' },
    { iconName: 'PaddleInCamping', tooltip: 'Paddle-In Camping' },
    { iconName: 'Paddling', tooltip: 'Paddling' },
    { iconName: 'ParkGate', tooltip: 'Park Gate' },
    { iconName: 'Picnic', tooltip: 'Picnic' },
    { iconName: 'PicnicShelter', tooltip: 'Picnic Shelter' },
    { iconName: 'PointofInterest', tooltip: 'Point of Interest' },
    { iconName: 'PrimitiveCabin', tooltip: 'Primitive Cabin' },
    { iconName: 'Restroom', tooltip: 'Restroom' },
    { iconName: 'RockClimbing', tooltip: 'Rock Climbing' },
    { iconName: 'SewerHookup', tooltip: 'Sewer Hookup' },
    { iconName: 'Swimming', tooltip: 'Swimming' },
    { iconName: 'TRACKTrail', tooltip: 'TRACK Trail' },
    { iconName: 'TentTrailerCamping', tooltip: 'Tent and Trailer Camping' },
    { iconName: 'VacationCabin', tooltip: 'Vacation Cabin' },
    { iconName: 'ViewingSymbol', tooltip: 'Viewing Area' },
    { iconName: 'VisitorCenter', tooltip: 'Visitor Center' },
    { iconName: 'WaterHookup', tooltip: 'Water Hookup' },
    { iconName: 'WaterSpigot', tooltip: 'Water Spigot' },
] as const;

//
// TYPES
//

export type ParkIcon = (typeof PARK_ICONS)[number];

export type TrailIcon = (typeof TRAIL_ICONS)[number];

// we can get rid of this once we have tooltips on the server
export const parkIconHelper = ({ iconName }: { iconName: string }) => {
    return PARK_ICONS.find((icon) => icon.iconName === iconName);
};

// we can get rid of this once we have tooltips on the server
export const trailIconHelper = ({ iconName }: { iconName: string }) => {
    return TRAIL_ICONS.find((icon) => icon.iconName === iconName);
};
