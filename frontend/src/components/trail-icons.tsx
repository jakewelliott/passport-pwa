import { dbg } from '@/lib/debug';
import type { TrailIconEnum } from '@/types';
import { BlankIconsTooltips } from '@/types';

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
    iconName: TrailIconEnum;
    size?: IconSize;
    showText?: boolean;
}) => {
    dbg('RENDER', 'TrailIcon', iconName);
    return (
        <div className='group relative flex flex-col items-center gap-1'>
            <div
                style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }}
                className='aspect-square'
                data-testid={iconName}
            >
                <img src={`/icons/misc/${iconName}.svg`} alt={BlankIconsTooltips[iconName]} />
            </div>
            {showText && <div className={`${sizeMap[size].text} text-center`}>{BlankIconsTooltips[iconName]}</div>}
            <div
                className='absolute bottom-full mb-1 hidden rounded bg-supporting_lightgray px-2 py-1 text-white text-xs group-hover:block'
                style={{ zIndex: 9999 }}
            >
                {BlankIconsTooltips[iconName]}
            </div>
        </div>
    );
};

export const TrailIcons = ({
    icons,
    className = '',
    size = 'md',
    showText = false,
}: {
    icons: TrailIconEnum[];
    className?: string;
    size?: IconSize;
    showText?: boolean;
}) => {
    dbg('RENDER', `TRAIL-ICONS - ${icons.length}`, icons);
    if (!icons.length) return null;

    return (
        <div className={`inline-flex items-center gap-1 px-1 ${className}`}>
            {icons.map((icon) => (
                <TrailIcon key={icon} iconName={icon} size={size} showText={showText} />
            ))}
        </div>
    );
};
