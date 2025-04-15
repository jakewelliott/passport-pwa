import {
    BLAZE_ICONS,
    BLUE_ICONS,
    GREEN_ICONS,
    type PassportIcon,
    RED_ICONS,
    TRAIL_ICONS,
    getIconPath,
} from '@/types/icons';

type IconWithExtraText = PassportIcon & {
    extraText?: string;
};

interface IconSection {
    sectionName: string;
    icons: IconWithExtraText[];
}

// type IconName = (typeof PARK_ICONS)[number]['iconName'];

// const EXTRA_TEXT: Partial<Record<IconName, string>> = {
//     'RVCamping-Green':
//         '*has electric, water, AND/OR sewer hookups. Check with reservations website for available hookups',
// };

const textHelper = (icon: PassportIcon) => ({
    ...icon,
});

// @biome-ignore lint/style/noNonNullAssertion: we know this icon exists
const ICON_SECTIONS: IconSection[] = [
    {
        sectionName: 'Camping',
        icons: GREEN_ICONS.map(textHelper),
    },
    {
        sectionName: 'Activities',
        icons: RED_ICONS.map(textHelper),
    },
    {
        sectionName: 'Amenities',
        icons: BLUE_ICONS.map(textHelper),
    },
    {
        sectionName: 'State Trail Stamps',
        icons: BLAZE_ICONS.map(textHelper),
    },
    {
        sectionName: 'Trail Amenities',
        icons: TRAIL_ICONS.map(textHelper),
    },
];

export const LegendIconView = ({ icon }: { icon: IconSection['icons'][number] }) => {
    return (
        <div key={icon.iconName} className='my-1 flex items-center'>
            <img src={getIconPath(icon)} alt={icon.tooltip} width={'36px'} height={'36px'} />
            <div className='ml-2 flex w-full flex-col justify-center'>
                <p>{icon.tooltip}</p>
                {icon.extraText && <p className='p-mini'>*{icon.extraText}</p>}
            </div>
        </div>
    );
};

export const LegendSections = () => {
    return (
        <div className='flex flex-col gap-4'>
            {ICON_SECTIONS.map((section) => (
                <div key={section.sectionName}>
                    <h4 className={`pb-3 text-icon_${section.sectionName.toLowerCase()}`}>{section.sectionName}</h4>
                    {section.icons.map((icon) => (
                        <LegendIconView key={icon.iconName} icon={icon} />
                    ))}
                </div>
            ))}
        </div>
    );
};
