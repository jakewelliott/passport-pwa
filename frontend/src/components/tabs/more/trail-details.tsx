import { Trail } from '@/lib/mock/types';

interface TrailDetailsProps {
  trail: Trail;
}

export const TrailDetails: React.FC<TrailDetailsProps> = ({ trail }) => {
  return (
    <p className='mb-2'>
      <span className='text-secondary_orange'>{trail.trailName}: </span>{' '}
      {trail.trailIcons.map((icon, index) => (
        <img key={index} src={`/park-icons/${icon}.png`} alt={icon} className='inline-block w-4 h-4 mx-1' />
      ))}{' '}
      <span className='text-secondary_orange'>▪</span> {trail.distance} <span className='text-secondary_orange'>▪</span>{' '}
      {trail.description}
    </p>
  );
};
