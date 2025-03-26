import type React from 'react';

interface HikingEssentialItemProps {
    imageSrc: string;
    altText: string;
    title: string;
    description: string;
}

export const HikingEssentialItem: React.FC<HikingEssentialItemProps> = ({ imageSrc, altText, title, description }) => {
    return (
        <div className='w-[calc(50%-1rem)] min-w-[150px] max-w-[200px] rounded-lg'>
            <div className='flex flex-col items-center'>
                <div className='relative aspect-[1/.5] w-full rounded-t-full bg-supporting_lightblue'>
                    <img
                        src={imageSrc}
                        alt={altText}
                        className='absolute inset-0 h-[calc(100%+6px)] w-full object-contain'
                    />
                </div>
                <h4 className='min-h-[20px] w-full hyphens-auto break-words bg-supporting_inactiveblue p-1.5 text-center text-[clamp(11px,calc(24/550*100vw),24px)] text-system_white leading-[clamp(8px,calc(20/550*100vw),20px)]'>
                    {title}
                </h4>
                <p className='w-full bg-supporting_lightblue p-mini py-3 text-center text-[clamp(12px,calc(18/550*100vw),18px)] leading-[clamp(16px,calc(22/550*100vw),22px)]'>
                    {description}
                </p>
            </div>
        </div>
    );
};
