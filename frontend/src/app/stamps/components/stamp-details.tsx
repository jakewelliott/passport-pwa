import { StampCollectedOn } from '@/components/stamp-collected-on';
import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import type { CollectedStamp } from '@/types';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface StampsDetailProps {
  abbreviation: string;
  handleClose: () => void;
}

const CollectedManually = ({ stamp }: { stamp: CollectedStamp | null }) =>
  stamp == null ? null : stamp.method !== 'manual' ? null : <p className='warning'>Stamp collected manually</p>;

export const StampDetails = ({ abbreviation: code, handleClose }: StampsDetailProps) => {
  const { data: stamp } = useStamp(code);
  const { data: park, isLoading: parkLoading } = usePark(code);
  const location = park?.addresses[0] ? `${park?.addresses[0].city}, NC` : 'NC';

  if (parkLoading || !park) return null;

  const closeHandlers = {
    onClick: handleClose,
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClose();
      }
    },
  };

  return (
    <>
      {/* Dark overlay */}
      <div className='fixed inset-0 bg-system_black opacity-65' style={{ zIndex: 40 }} {...closeHandlers} />
      {/* Dialog */}
      <div className='fixed inset-0 flex items-center justify-center' style={{ zIndex: 50 }} {...closeHandlers}>
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
              <img src={`/stamps/${code}.svg`} alt={`${code} stamp`} className='h-32 w-32' />
            </div>
            <div className='space-y-2'>
              <p className='text-supporting_inactiveblue'>{location}</p>
              <StampCollectedOn stamp={stamp} />
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
