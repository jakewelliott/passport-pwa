import { cn } from '@/lib/cn-helper';
import { dbg } from '@/lib/debug';
import { TRAIL_ICONS_TOOLTIPS, type TrailIcon } from '@/types';

const tooltip = (iconName: TrailIcon) => TRAIL_ICONS_TOOLTIPS[iconName];
const iconPath = (iconName: TrailIcon) => `/icons/misc/${iconName}.svg`;

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
                <img src={iconPath(iconName)} alt={tooltip(iconName)} />
            </div>
            {showText && <div className={cn(sizeMap[size].text, 'text-center')}>{tooltip(iconName)}</div>}
            <div
                className='absolute bottom-full mb-1 hidden rounded bg-supporting_lightgray px-2 py-1 text-white text-xs group-hover:block'
                style={{ zIndex: 9999 }}
            >
                {tooltip(iconName)}
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
                <TrailIconView key={icon} iconName={icon} size={size} showText={showText} />
            ))}
        </div>
    );
};
