import type { Park, ParkIcon } from '@/types';
import type React from 'react';

const Highlight = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  return (
    <p className={children ? 'mb-2' : ''}>
      <span className='green-text'>{title}:</span>&nbsp;&nbsp;{children}
    </p>
  );
};

const renderTrails = (trails: string) => {
  const trailLines = trails.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

  return (
    <div className='flex flex-col gap-1 pb-4'>
      {trailLines.map((line) => (
        <div className={line.charAt(0) !== '■' ? 'pl-5' : ''} key={line}>{line}</div>
      ))}
    </div>
  );
};

const IconView = ({ icon }: { icon: ParkIcon }) => {
  return <img src={`/icons/park/${icon.iconName}.svg`} width={55} height={55} alt={`${icon.iconName}`} />;
};

const ParkIcons = ({ park }: { park: Park }) => {
  console.log('park', park);
  return (
    <div data-testid='icon-scroll-container' className='icon-scroll-container overflow-x-auto'>
      <div className='inline-flex gap-6 px-6'>
        {park.icons.map((parkIcon) => (
          <IconView key={parkIcon.iconName} icon={parkIcon} />
        ))}
        <div className='w-px flex-shrink-0' />
      </div>
    </div>
  );
};

export const DetailsMiniTab = ({ park }: { park: Park }) => {
  return (
    <div className='mt-6 mb-6 flex flex-col'>
      <div className='gap-2 pr-6 pl-6'>
        {park.establishedYear && <Highlight title='Established'>{park.establishedYear}</Highlight>}
        {park.landmark && <Highlight title='Landmark'>{park.landmark}</Highlight>}
        {park.youCanFind && <Highlight title='You can find'>{park.youCanFind}</Highlight>}
        {park.trails && (<div className='flex flex-col gap-1'>
          <Highlight title='Park trails' />
          {renderTrails(park.trails)}
        </div>)}
      </div>
      <ParkIcons park={park} />
    </div>
  );
};
