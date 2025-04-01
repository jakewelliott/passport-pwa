//
// PARK ICONS
//

export const RED_ICONS = [
    { iconName: 'Biking-Red', tooltip: 'Biking' },
    { iconName: 'Fishing-Red', tooltip: 'Fishing' },
    { iconName: 'Hiking-Red', tooltip: 'Hiking' },
    { iconName: 'HorsebackRiding-Red', tooltip: 'Horseback Riding' },
    { iconName: 'Paddling-Red', tooltip: 'Paddling' },
    { iconName: 'Picnicking-Red', tooltip: 'Picnicking' },
    { iconName: 'RockClimbing-Red', tooltip: 'Rock Climbing' },
    { iconName: 'Swimming-Red', tooltip: 'Swimming' },
] as const;

export const BLUE_ICONS = [
    { iconName: 'BoatRamp-Blue', tooltip: 'Boat Ramp' },
    { iconName: 'BoatRental-Blue', tooltip: 'Boat Rental' },
    { iconName: 'Exhibits-Blue', tooltip: 'Exhibits' },
    { iconName: 'Playground-Blue', tooltip: 'Playground' },
    { iconName: 'VisitorCenter-Blue', tooltip: 'Visitor Center' },
] as const;

export const GREEN_ICONS = [
    { iconName: 'CamperCabins-Green', tooltip: 'Camper Cabins' },
    { iconName: 'Camping-Green', tooltip: 'Camping' },
    { iconName: 'CanoeinCamping-Green', tooltip: 'Canoe-in Camping' },
    { iconName: 'EquestrianCamping-Green', tooltip: 'Equestrian Camping' },
    { iconName: 'GroupCabins-Green', tooltip: 'Group Cabins' },
    { iconName: 'GroupCamp-Green', tooltip: 'Group Camping' },
    { iconName: 'PrimitiveCabin-Green', tooltip: 'Primitive Cabin' },
    { iconName: 'RVCamping-Green', tooltip: 'RV Camping' },
    { iconName: 'VacationCabin-Green', tooltip: 'Vacation Cabin' },
] as const;

export const BLACK_ICONS = [
    { iconName: 'Camping-Black', tooltip: 'Camping Sites' },
    { iconName: 'PicnicShelter-Black', tooltip: 'Picnic Shelter' },
] as const;

export const BLAZE_ICONS = [
    { iconName: 'FBST-Blaze', tooltip: 'French Broad State Trail' },
    { iconName: 'FFST-Blaze', tooltip: 'Fontana Lake State Trail' },
    { iconName: 'HGST-Blaze', tooltip: 'Hickory Nut Gorge State Trail' },
    { iconName: 'MST-Blaze', tooltip: 'Mountains-to-Sea State Trail' },
    { iconName: 'YRST-Blaze', tooltip: 'Yadkin River State Trail' },
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
