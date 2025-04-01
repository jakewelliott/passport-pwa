import { BLAZE_ICONS, BLUE_ICONS, GREEN_ICONS, type PARK_ICONS, type ParkIcon, RED_ICONS } from '@/types/icons';

type IconWithExtraText = ParkIcon;

interface IconSection {
    sectionName: string;
    icons: IconWithExtraText[];
}

type IconName = (typeof PARK_ICONS)[number]['iconName'];

const textHelper = (icon: ParkIcon) => ({
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
];

const path = (iconName: IconName) => `/icons/park/${iconName}.svg`;

const IconView = ({ icon }: { icon: IconSection['icons'][number] }) => {
    return (
        <div key={icon.iconName} className='my-1 flex items-center'>
            <img src={path(icon.iconName)} alt={icon.tooltip} width={'36px'} height={'36px'} />
            <div className='ml-2 flex w-full flex-col justify-center'>
                <p>{icon.tooltip}</p>
                {icon.extraText && <p className='max-w-56 p-mini'>*{icon.extraText}</p>}
            </div>
        </div>
    );
};

export const LegendSections = () => {
    return (
        <>
            {ICON_SECTIONS.map((section) => (
                <div className='m-4' key={section.sectionName}>
                    <h4 className={`pb-3 text-icon_${section.sectionName.toLowerCase()}`}>{section.sectionName}</h4>
                    {section.icons.map((icon) => (
                        <IconView key={icon.iconName} icon={icon} />
                    ))}
                </div>
            ))}
        </>
    );
};
