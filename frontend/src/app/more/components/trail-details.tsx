import { TrailIcons } from '@/components/trail-icons';
import type { Trail } from '@/types';

export const TrailDetailView = ({ trail }: { trail: Trail }) => {
    return (
        <div className='mb-2 gap-2'>
            <span className='text-secondary_orange'>{trail.trailName}:</span>
            <TrailIcons data-testid='trail-icons' icons={trail.icons} size='xs' />
            <span className='text-secondary_orange'>▪</span>
            {` ${trail.distance}`} <span className='text-secondary_orange'>▪</span>
            {` ${trail.description}`}
        </div>
    );
};
