import { TrailIcons } from '@/components/trail-icons';
import type { Trail } from '@/types';
import { FaPen } from 'react-icons/fa6';

export const TrailDetailView = ({ trail, handleEditTrail }: { trail: Trail; handleEditTrail?: () => void }) => {
    return (
        <div className='flex'>
            <div className='mb-2 gap-2'>
                <span className='text-secondary-orange'>{trail.trailName}:</span>
                <TrailIcons data-testid='trail-icons' icons={trail.icons} size='xs' />
                <span className='text-secondary-orange'>▪</span>
                {` ${trail.distance}`} <span className='text-secondary-orange'>▪</span>
                {` ${trail.description}`}
            </div>
            <div className='ml-auto w-7'>
                {handleEditTrail && (
                    <button
                        className='flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                        onClick={handleEditTrail}
                        type='button'
                    >
                        <FaPen size={15} />
                    </button>
                )}
            </div>
        </div>
    );
};
