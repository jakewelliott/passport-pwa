import type { Park, ParkIcon } from '@/types';
import { parkIconHelper } from '@/types/icons';
import type React from 'react';
const path = (icon: ParkIcon) => `/icons/park/${icon.iconName}.svg`;

const Highlight = ({ title, children }: { title: string; children?: React.ReactNode }) => {
    return (
        <p>
            <span className='green-text'>{title}:</span>&nbsp;&nbsp;{children}
        </p>
    );
};

const renderTrails = (trails: string) => {
    const trailLines = trails.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

    return (
        <div className='flex flex-col gap-1 py-2'>
            {trailLines.map((line) => (
                <div className={line.charAt(0) !== '■' ? 'pl-5' : ''} key={line}>
                    {line}
                </div>
            ))}
        </div>
    );
};

const IconView = ({ key, icon }: { key: string; icon: ParkIcon }) => {
    return <img key={key} src={path(icon)} width={55} height={55} alt={icon.tooltip} />;
};

const ParkIcons = ({ icons }: { icons: ParkIcon[] }) => {
    return (
        <div data-testid='icon-scroll-container' className='icon-scroll-container overflow-x-auto'>
            <div className='inline-flex gap-6 px-6'>
                {icons.map((icon) => (
                    <IconView key={icon.iconName} icon={icon} />
                ))}
                <div className='w-px flex-shrink-0' />
            </div>
        </div>
    );
};

export const DetailsMiniTab = ({ park }: { park: Park }) => {
    const icons = park.icons.map((icon) => parkIconHelper({ iconName: icon.iconName })) as ParkIcon[];

    return (
        <div className='mt-6 mb-6 flex flex-col'>
            <div className='gap-2 pr-6 pb-6 pl-6'>
                <Highlight title='Established'>{park.establishedYear}</Highlight>
                <Highlight title='Landmark'>{park.landmark}</Highlight>
                <Highlight title='You can find'>{park.youCanFind}</Highlight>
                <div className='flex flex-col gap-1'>
                    <Highlight title='Park trails' />
                    {renderTrails(park.trails)}
                </div>
            </div>
            <ParkIcons icons={icons} />
        </div>
    );
};
