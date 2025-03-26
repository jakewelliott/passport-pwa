import { TrailIcons } from '@/components/trail-icons';
import { dbg } from '@/lib/debug';
import type { Trail } from '@/types';

const Highlight = ({ children }: { children: React.ReactNode }) => {
    return <span className='text-secondary_orange'>{children}</span>;
};

const BulletPoint = ({ children }: { children: React.ReactNode }) => {
    return (
        <span>
            <Highlight>▪&nbsp;</Highlight>
            {children}
        </span>
    );
};

/* 
<div className='mb-2 flex flex-col gap-2'>
	<Highlight>{trail.trailName}:</Highlight>
	<TrailIcons data-testid='trail-icons' trail={trail} size='xs' showText={false} />
	<BulletPoint>{trail.distance}</BulletPoint>
	<BulletPoint>{trail.description}</BulletPoint>
</div>
*/

export const TrailDetailView = ({ trail }: { trail: Trail }) => {
    dbg('RENDER', 'TrailDetailView', trail);
    return (
        <div className='mb-2 gap-2'>
            <span className='text-secondary_orange'>{trail.trailName}:</span>
            <TrailIcons data-testid='trail-icons' trail={trail} size='xs' />
            <span className='text-secondary_orange'>▪</span>
            {` ${trail.distance}`} <span className='text-secondary_orange'>▪</span>
            {` ${trail.description}`}
        </div>
    );
};
