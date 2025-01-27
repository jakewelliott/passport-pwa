import type { Trail } from '@/lib/mock/types';
import trailIconsJson from 'public/icons/trail/_icons.json';
const TRAIL_ICON_PATH = '/public/icons/trail/';

const TrailIcon = ({ iconName }: { iconName: string }) => {
  const iconData = trailIconsJson.find((icon) => icon.f === iconName);

  if (!iconData) {
    console.error(`Icon data not found for ${iconName}`);
    return null;
  }

  const iconPath = `${TRAIL_ICON_PATH}${iconName}.svg`;

  return <img src={iconPath} alt={iconData?.t || iconName} className='h-6 w-6' />;
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
