import type { Park } from '@/lib/mock/types';

export const LocationDetails = ({ park }: { park: Park }) => {
  return (
    <div className='mt-6 mb-6 flex flex-col'>
      <p className='pr-6 pl-6'>
        {park.established && (
          <>
            <span className='green-text'>Established: </span>
            {park.established}
            <br />
            <br />
          </>
        )}
        {park.landmark && (
          <>
            <span className='green-text'>Landmark: </span>
            {park.landmark}
            <br />
            <br />
          </>
        )}
        {park.youCanFind && (
          <>
            <span className='green-text'>You can find... </span>
            {park.youCanFind}
            <br />
            <br />
          </>
        )}
        {park.trails && (
          <>
            <span className='green-text'>Trails: </span>
            {String(park.trails)}
            <br />
            <br />
          </>
        )}
      </p>
      <div className='icon-scroll-container overflow-x-auto'>
        <div className='inline-flex gap-6 px-6'>
          {park.parkIcons.map((icon, index) => (
            <img src={`/icons/park/${icon}`} width={55} height={55} key={icon} alt={`Park icon ${index + 1}`} />
          ))}
          <div className='w-px flex-shrink-0' />
        </div>
      </div>
    </div>
  );
};
