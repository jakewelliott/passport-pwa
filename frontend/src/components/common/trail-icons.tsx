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

const TrailIcon = ({ iconName }: { iconName: string }) => {
  const iconPath = `/icons/park/${iconName}.svg`;
  return <img src={iconPath} alt={iconName} className='h-6 w-6' />;
};

export const TrailIcons = ({ trail, className = '' }: { trail: Trail; className?: string }) => {
  if (!trail.trailIcons?.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {trail.trailIcons.map((iconName) => (
        <TrailIcon key={iconName} iconName={iconName} />
      ))}
    </div>
  );
};
