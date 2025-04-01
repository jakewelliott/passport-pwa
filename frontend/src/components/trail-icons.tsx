import { cn } from '@/lib/cn-helper';
import type { TrailIcon } from '@/types';
import { getIconPath } from '@/types/icons';

type IconSize = 'sm' | 'md' | 'lg' | 'xs';

const sizeMap = {
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

export const TrailIconView = ({
    icon,
    size = 'md',
    showText = false,
}: {
    icon: TrailIcon;
    size?: IconSize;
    showText?: boolean;
}) => {
    if (icon === undefined) return null;

    console.log(icon);

    return (
        <div className='group relative flex flex-col items-center gap-1'>
            <div
                style={{ height: sizeMap[size].icon, width: sizeMap[size].icon }}
                className='aspect-square'
                data-testid={icon.iconName}
            >
                <img src={getIconPath(icon)} alt={icon.tooltip} />
            </div>
            {showText && <div className={cn(sizeMap[size].text, 'text-center')}>{icon.tooltip}</div>}
            <div
                className='absolute bottom-full mb-1 hidden rounded bg-supporting_lightgray px-2 py-1 text-white text-xs group-hover:block'
                style={{ zIndex: 9999 }}
            >
                {icon.tooltip}
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
                <TrailIconView key={icon.iconName} icon={icon} size={size} showText={showText} />
            ))}
        </div>
    );
};
