import type { Park, ParkIcon } from '@/types';
import type React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

// ADAM: SURELY there's a better way to do this than modifying the DOM directly
const Tooltip = ({ text, position }: { text: string; position: { top: number; left: number } }) => {
    return ReactDOM.createPortal(
        <div
            className='pointer-events-none absolute rounded-md bg-supporting-lightgray bg-opacity-70 p-1'
            style={{
                top: position.top,
                left: position.left,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            {text}
        </div>,
        document.body, // Render the tooltip outside of the scrollable container
    );
};

const Highlight = ({ title, children }: { title: string; children?: React.ReactNode }) => {
    return (
        <p>
            <span className='text-main-green'>{title}:</span>&nbsp;&nbsp;{children}
        </p>
    );
};

const IconView = ({ icon }: { icon: ParkIcon }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top + window.scrollY - 40, // Position tooltip above the icon
            left: rect.left + window.scrollX, // Center horizontally
        });
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <div style={{ position: 'relative', width: '55px', height: '55px' }}>
            <img
                src={`/icons/park/${icon.iconName}.svg`}
                width={55}
                height={55}
                alt={icon.tooltip}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {tooltipVisible && <Tooltip text={icon.tooltip} position={tooltipPosition} />}
        </div>
    );
};

const ParkIcons = ({ icons }: { icons: ParkIcon[] }) => {
    return (
        <div data-testid='icon-scroll-container' className='icon-scroll-container overflow-x-auto'>
            <div className='inline-flex gap-6 px-6'>
                {icons.map((icon) => (
                    <IconView key={icon.iconName} icon={icon} />
                ))}
                <div className='w-px flex-shrink-0' /> {/* What is this? */}
            </div>
        </div>
    );
};

export const DetailsMiniTab = ({ park }: { park: Park }) => {
    const trailLines = park.trails.split('\n').filter((line) => line.trim() !== '');

    return (
        <>
            <div className='flex flex-col gap-2 p-4'>
                <Highlight title='Established'>{park.establishedYear}</Highlight>
                <Highlight title='Landmark'>{park.landmark}</Highlight>
                <Highlight title='You can find'>{park.youCanFind}</Highlight>
                <Highlight title='Park trails' />
                {trailLines.map((line) => (
                    <div className={line.charAt(0) !== '■' ? 'pl-5' : ''} key={line}>
                        {line}
                    </div>
                ))}
            </div>
            <ParkIcons icons={park.icons} />
        </>
    );
};
