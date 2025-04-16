import { GenericIcon } from '@/components/generic-icon';
import { stampCollectedOn } from '@/components/stamp-collected-on';
import { useStamp } from '@/hooks/queries/useStamps';
import { a11yOnClick } from '@/lib/a11y';
import { dbg } from '@/lib/debug';
import type { CollectedStamp, Park } from '@/types';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';

interface StampsDetailProps {
    park: Park;
    handleClose: () => void;
}

const CollectedManually = ({ stamp }: { stamp?: CollectedStamp }) =>
    stamp?.method !== 'manual' ? null : <p className='warning'>Stamp collected manually</p>;

export const StampDetails = ({ park, handleClose }: StampsDetailProps) => {
    const { data: stamp } = useStamp(park.id);
    dbg('RENDER', 'StampDetails', stamp);
    const parkCityState = park?.addresses[0] ? `${park?.addresses[0].city}, NC` : 'NC';

    return (
        <>
            {/* Dark overlay */}
            <div
                className='fixed inset-0 bg-system_black opacity-65'
                style={{ zIndex: 40 }}
                {...a11yOnClick(handleClose)}
            />
            {/* Dialog */}
            <div
                className='fixed inset-0 flex items-center justify-center'
                style={{ zIndex: 50 }}
                {...a11yOnClick(handleClose)}
            >
                <article
                    className='relative mx-4 w-full max-w-sm rounded-lg bg-supporting_lightblue p-4 shadow-xl'
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <header className='mb-4'>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-center'>{park.parkName}</h3>
                            <button
                                className='rounded-full p-2 transition-colors hover:bg-black/10'
                                onClick={handleClose}
                                type='button'
                                aria-label='Close park details'
                            >
                                <FaTimes className='text-system_gray' />
                            </button>
                        </div>
                    </header>
                    <div className='space-y-3'>
                        <div className='flex justify-center'>
                            <img
                                src={
                                    park.stampImage &&
                                    (park.stampImage.startsWith('http://') || park.stampImage.startsWith('http://'))
                                        ? park.stampImage
                                        : `/stamps/${park.stampImage}`
                                }
                                alt={`${park.abbreviation} stamp`}
                                className='h-32 w-32'
                            />
                        </div>
                        <div className='space-y-2'>
                            <p className='text-supporting_inactiveblue'>{parkCityState}</p>
                            <GenericIcon name='stamp' text={stampCollectedOn(stamp)} testId='stamp-collected-on' />
                            <CollectedManually stamp={stamp} />
                            <Link to={`/locations/${park.abbreviation}`} className='link inline-block'>
                                View Park Details <span aria-hidden='true'>&gt;</span>
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
};
