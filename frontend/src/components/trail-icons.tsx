import type { Trail } from '@/types';

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

interface TrailIconProps {
  iconName: IconName;
  size?: IconSize;
  showText?: boolean;
  key?: string;
}

export const TrailIcon = ({ iconName, size = 'md', showText = false, key }: TrailIconProps) => {
  return (
    <div className='flex flex-col items-center gap-1' key={key}>
      <div style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }} className='aspect-square'>
        <img src={`/icons/park/${iconName}.svg`} alt={iconName} />
      </div>
      {showText && <div className={`${sizeMap[size].text} text-center`}>{iconName}</div>}
    </div>
  );
};

interface TrailIconsProps {
  trail: Trail;
  className?: string;
  size?: IconSize;
  showText?: boolean;
}

export const TrailIcons = ({ trail, className = '', size = 'md', showText = true }: TrailIconsProps) => {
  if (!trail.trailIcons?.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {trail.trailIcons.map((trailIcon) => (
        <TrailIcon key={trailIcon.iconName} iconName={trailIcon.iconName as IconName} size={size} showText={showText} />
      ))}
    </div>
  );
};
