import { dbg } from '@/lib/debug';
import type { Trail } from '@/types';

type IconSize = 'sm' | 'md' | 'lg' | 'xs';

export const sizeMap = {
    xs: {
        icon: 16,
        text: 'text-xs',
    },
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
    iconName: string;
    size?: IconSize;
    showText?: boolean;
}) => {
    dbg('RENDER', `trail-icon - ${iconName}`);
    return (
        <div className='flex flex-col items-center gap-1'>
            <div style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }} className='aspect-square'>
                <img src={`/icons/misc/${iconName}.svg`} alt={iconName} />
            </div>
            {showText && <div className={`${sizeMap[size].text} text-center`}>{iconName}</div>}
        </div>
    );
};

export const TrailIcons = ({
    trail,
    className = '',
    size = 'md',
    showText = false,
}: {
    trail: Trail;
    className?: string;
    size?: IconSize;
    showText?: boolean;
}) => {
    const iconNames = trail.icons?.map((icon) => icon.toString()) || [];
    dbg('RENDER', `TRAIL-ICONS - ${iconNames.length}`, iconNames);
    if (!iconNames.length) return null;

    return (
        <div className={`inline-flex items-center gap-1 px-1 ${className}`}>
            {trail.icons.map((trailIcon) => (
                <TrailIcon key={trailIcon} iconName={trailIcon} size={size} showText={showText} />
            ))}
        </div>
    );
};
