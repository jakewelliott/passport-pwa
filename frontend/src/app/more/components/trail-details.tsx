import { TrailIcons } from '@/components/trail-icons';
import type { Trail } from '@/types';

export const TrailDetailView = ({ trail }: { trail: Trail }) => {
  return (
    <div className='mb-2 flex flex-col gap-2'>
      <span className='text-secondary_orange'>{trail.trailName}:</span>
      <span className='text-secondary_orange'>▪</span>
      {trail.distance} <span className='text-secondary_orange'>▪</span> <p>{trail.description}</p>
      <TrailIcons data-testid='trail-icons' trail={trail} />
    </div>
  );
};
