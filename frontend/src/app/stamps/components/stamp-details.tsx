import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import DateHelper from '@/lib/date-helper';
import type { ParkAbbreviation, Stamp } from '@/lib/mock/types';
import { FaTimes } from 'react-icons/fa';

interface StampsDetailProps {
  abbreviation: ParkAbbreviation;
  handleClose: () => void;
}

const CollectedOn = ({ stamp }: { stamp: Stamp | null }) =>
  stamp == null ? (
    <p className='font-medium text-amber-600'>Stamp not yet collected</p>
  ) : (
    <p className='font-medium'>Stamp collected on {DateHelper.stringify(stamp.timestamp)}</p>
  );

const CollectedManually = ({ stamp }: { stamp: Stamp | null }) =>
  stamp == null ? null : stamp.location !== null ? null : (
    <p className='font-medium text-amber-600'>Stamp collected manually</p>
  );

export const StampDetails = ({ abbreviation: code, handleClose }: StampsDetailProps) => {
  const { data: stamp, isLoading: stampLoading } = useStamp(code);
  const { data: park, isLoading: parkLoading } = usePark(code);

  if (parkLoading || !park) return null;
  if (stampLoading || !stamp) return null;

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
      <div className='fixed inset-0 bg-black opacity-75' style={{ zIndex: 40 }} {...closeHandlers} />
      {/* Dialog */}
      <div className='fixed inset-0 flex items-center justify-center' style={{ zIndex: 50 }} {...closeHandlers}>
        <article
          className='relative mx-4 w-full max-w-sm rounded-lg bg-supporting_lightblue p-4 shadow-xl'
          {...closeHandlers}
        >
          <header className='mb-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-center font-semibold text-xl'>{park.parkName}</h3>
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
              <p className='text-supporting_inactiveblue'>{park.addresses[0].city}</p>
              <CollectedOn stamp={stamp} />
              <CollectedManually stamp={stamp || null} />
              <a
                href={`/locations/${park.abbreviation}`}
                className='inline-block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
              >
                View Park Details <span aria-hidden='true'>&gt;</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};
