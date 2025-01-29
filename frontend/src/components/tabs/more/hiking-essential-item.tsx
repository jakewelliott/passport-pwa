import React from 'react';

interface HikingEssentialItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

export const HikingEssentialItem: React.FC<HikingEssentialItemProps> = ({ imageSrc, altText, title, description }) => {
  return (
    <div className="w-[calc(50%-1rem)] max-w-[200px] min-w-[150px] rounded-lg">
      <div className="flex flex-col items-center">
        <div className="w-full aspect-[1/.5] bg-supporting_lightblue rounded-t-full relative">
          <img
            src={imageSrc}
            alt={altText}
            className="absolute inset-0 w-full h-[calc(100%+6px)] object-contain"
          />
        </div>
        <h4 className="p-1.5 bg-supporting_inactiveblue text-system_white w-full text-center min-h-[20px] break-words hyphens-auto text-[clamp(11px,calc(24/550*100vw),24px)] leading-[clamp(8px,calc(20/550*100vw),20px)]">{title}</h4>
        <p className="py-3 p-mini text-center w-full bg-supporting_lightblue text-[clamp(12px,calc(18/550*100vw),18px)] leading-[clamp(16px,calc(22/550*100vw),22px)]">
          {description}
        </p>
      </div>
    </div>
  );
}; 