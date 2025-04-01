import { cn } from '@/lib/cn-helper';
import { FaGlobe, FaRegCheckSquare, FaRegEnvelope, FaRegSquare, FaStamp } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { FiNavigation, FiPhone } from 'react-icons/fi';

interface IconProps {
    strokeWidth?: number;
}

const GENERIC_ICONS = {
    location: FiNavigation,
    check: FaRegCheckSquare,
    uncheck: FaRegSquare,
    ballot: FaListCheck,
    phone: FiPhone,
    email: FaRegEnvelope,
    stamp: FaStamp,
    web: FaGlobe,
};

export interface GenericIconProps {
    name: keyof typeof GENERIC_ICONS;
    props?: IconProps;
    size?: number;
    color?: string;
    text?: string;
    textClassName?: string;
    testId?: string;
}

export const GenericIcon = ({
    name,
    props = { strokeWidth: 3 },
    // size = 4,
    color = 'supporting_inactiveblue',
    text,
    textClassName,
    testId,
}: GenericIconProps) => {
    const Icon = GENERIC_ICONS[name];
    return (
        <div className={cn('flex h-fit flex-row items-center gap-2', `text-${color}`)}>
            <div className='aspect-square' data-testid={testId}>
                <Icon {...props} />
            </div>
            {text && <p className={textClassName}>{text}</p>}
        </div>
    );
};
