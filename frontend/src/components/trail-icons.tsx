import { dbg } from '@/lib/debug';
import type { BlankIcons, Trail } from '@/types';

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

export const TrailIcon = ({
  iconName,
  size = 'md',
  showText = false,
}: {
  iconName: BlankIcons;
  size?: IconSize;
  showText?: boolean;
}) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }} className='aspect-square'>
        <img src={`/icons/misc/${iconName}.png`} alt={iconName} />
      </div>
      {showText && <div className={`${sizeMap[size].text} text-center`}>{iconName}</div>}
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
  dbg('RENDER', `TRAIL-ICONS - ${(trail.icons?.length)}`, trail);
  if (!trail.icons?.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {trail.icons.map((trailIcon) => (
        <TrailIcon key={trailIcon.iconName} iconName={trailIcon.iconName} size={size} showText={showText} />
      ))}
    </div>
  );
};
