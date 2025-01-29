import type { Trail } from '@/lib/mock/types';
import { TrailIcons } from '@/components/common/trail-icons';

export const TrailDetailView = ({ trail }: { trail: Trail }) => {
  return (
    <p className='mb-2'>
      <span className='text-secondary_orange'>{trail.trailName}: </span>
      <TrailIcons trail={trail} />
      <span className='text-secondary_orange'>▪</span> {trail.distance} <span className='text-secondary_orange'>▪</span>{' '}
      {trail.description}
    </p>
  );
};
