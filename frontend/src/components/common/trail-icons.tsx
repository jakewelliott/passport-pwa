import type { Trail } from '@/lib/mock/types';

const ICON_SVG = [
  'Biking-Red',
  'BoatRamp-Blue',
  'BoatRental-Blue',
  'CamperCabins-Green',
  'Camping-Black',
  'Camping-Green',
  'CanoeinCamping-Green',
  'EquestrianCamping-Green',
  'Exhibits-Blue',
  'FBST-Blaze',
  'FFST-Blaze',
  'Fishing-Red',
  'GroupCabins-Green',
  'GroupCamp-Green',
  'HGST-Blaze',
  'Hiking-Red',
  'HorsebackRiding-Red',
  'MST-Blaze',
  'Paddling-Red',
  'PicnicShelter-Black',
  'Picnicking-Red',
  'Playground-Blue',
  'PrimitiveCabin-Green',
  'RockClimbing-Red',
  'RVCamping-Green',
  'Swimming-Red',
  'VacationCabin-Green',
  'VisitorCenter-Blue',
  'YST-Blaze',
] as const;

type IconName = (typeof ICON_SVG)[number];

const filterIcons = (r: string) => ICON_SVG.filter((icon): icon is IconName => icon.includes(r));

const activityIcons = filterIcons('Red');
const amenityIcons = filterIcons('Blue');
const campingIcons = filterIcons('Green');
const blazeIcons = filterIcons('Blaze');

type IconSize = 'sm' | 'md' | 'lg';

const sizeMap = {
  sm: {
    icon: 32,
    text: 'text-xs',
  },
  md: {
    icon: 48,
    text: 'text-sm',
  },
  lg: {
    icon: 64,
    text: 'text-base',
  },
} as const;

const parseText = (fname: string) => {
  // Remove color suffixes and hyphens
  const withoutColor = fname.replace(/-(Red|Blue|Green|Black|Blaze)/g, '');
  // Add spaces before capital letters and remove remaining hyphens
  return withoutColor
    .replace(/([A-Z])/g, ' $1') // Add space before capitals
    .replace(/-/g, ' ') // Remove any remaining hyphens
    .trim(); // Remove leading/trailing spaces
};

export const TrailIcon = ({
  iconName,
  size = 'md',
  showText = false,
}: {
  iconName: IconName;
  size?: IconSize;
  showText?: boolean;
}) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }} className='aspect-square'>
        <img src={`/icons/park/${iconName}.svg`} alt={parseText(iconName)} />
      </div>
      {showText && <div className={`${sizeMap[size].text} text-center`}>{parseText(iconName)}</div>}
    </div>
  );
};

export const TrailIcons = ({
  trail,
  className = '',
  size = 'md',
  showText = true,
}: {
  trail: Trail;
  className?: string;
  size?: IconSize;
  showText?: boolean;
}) => {
  if (!trail.trailIcons?.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {trail.trailIcons.map((iconName) => (
        <TrailIcon key={iconName} iconName={iconName as IconName} size={size} showText={showText} />
      ))}
    </div>
  );
};
