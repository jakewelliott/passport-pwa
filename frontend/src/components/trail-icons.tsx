import { cn } from '@/lib/cn-helper';
import { dbg } from '@/lib/debug';
import type { TrailIcon } from '@/types';

const path = (icon: TrailIcon) => `/icons/misc/${icon.iconName}.svg`;

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

// ADAM: this is only exported for testing!!
export const TrailIconView = ({
    iconName,
    size = 'md',
    showText = false,
}: {
    iconName: TrailIcon;
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
                <img src={path(iconName)} alt={iconName.tooltip} />
            </div>
            {showText && <div className={cn(sizeMap[size].text, 'text-center')}>{iconName.tooltip}</div>}
            <div
                className='absolute bottom-full mb-1 hidden rounded bg-supporting_lightgray px-2 py-1 text-white text-xs group-hover:block'
                style={{ zIndex: 9999 }}
            >
                {iconName.tooltip}
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
    icons: TrailIcon[];
    className?: string;
    size?: IconSize;
    showText?: boolean;
}) => {
    if (icons.length === 0) return null;
    return (
        <div className={cn('inline-flex items-center gap-1 px-1', className)}>
            {icons.map((icon) => (
                <TrailIconView key={icon.iconName} iconName={icon} size={size} showText={showText} />
            ))}
        </div>
    );
};
