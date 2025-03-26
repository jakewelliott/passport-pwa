import { cn } from '@/lib/cn-helper';
import { dbg } from '@/lib/debug';
import type { Trail, TrailIconEnum } from '@/types';

type IconSize = 'xs' | 'sm' | 'md' | 'lg';

const sizeStyles = {
    xs: {
        icon: 'h-4 w-4',
        text: 'text-xs',
    },
    sm: {
        icon: 'h-8 w-8',
        text: 'text-xs',
    },
    md: {
        icon: 'h-12 w-12',
        text: 'text-sm',
    },
    lg: {
        icon: 'h-16 w-16',
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
    size = 'xs',
    showText = false,
}: {
    iconName: TrailIconEnum;
    size?: IconSize;
    showText?: boolean;
}) => {
    dbg('RENDER', 'TrailIcon', iconName);
    return (
        <div className='flex flex-col items-center gap-1'>
            <div className={cn(sizeStyles[size].icon, 'aspect-square')}>
                <img src={`/icons/misc/${iconName}.svg`} alt={parseText(iconName)} />
            </div>
            {showText && <p className={cn(sizeStyles[size].text, 'text-center')}>{parseText(iconName)}</p>}
        </div>
    );
};

export const TrailIcons = ({
    trail,
    className = '',
    size = 'xs',
    showText = true,
}: {
    trail: Trail;
    className?: string;
    size?: IconSize;
    showText?: boolean;
}) => {
    dbg('RENDER', 'TrailIcons', trail);
    if (!trail.icons?.length) return null;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {trail.icons.map((trailIcon) => (
                <TrailIcon key={trailIcon} iconName={trailIcon} size={size} showText={false} />
            ))}
        </div>
    );
};
