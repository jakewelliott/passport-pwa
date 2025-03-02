import { usePark, useParkActivity } from '@/hooks/queries/useParks';
import { useCollectStamp } from '@/hooks/queries/useStamps';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { useParkCheck } from '@/hooks/useParkCheck';
import { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const HeaderMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const collectStampMutation = useCollectStamp(location.pathname.split('/')[2]);
  const userLocation = useUserLocation();
  const parkCheck = useParkCheck();
  const { data: park } = usePark(location.pathname.split('/')[2]);
  const { refetch } = useParkActivity(park?.id ?? 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isParkDetail = location.pathname.startsWith('/locations/') && location.pathname.length > 11;
  const atPark = parkCheck.park?.abbreviation === location.pathname.split('/')[2] ? 'location' : 'manual';
  const handleCollectStamp = () => {
    collectStampMutation.mutate({
      latitude: userLocation.geopoint?.latitude || 0,
      longitude: userLocation.geopoint?.longitude || 0,
      inaccuracyRadius: userLocation.geopoint?.accuracy || 0,
      method: atPark,
      dateTime: new Date(),
    });
    refetch();
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      {isParkDetail && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center p-2 text-system_white'
          type='button'
          aria-label='Open menu'
        >
          <FaEllipsisV />
        </button>
      )}

      {isOpen && (
        <div className='absolute top-full right-0 mt-2 w-48 rounded-md bg-system_white shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {isParkDetail && (
              <button
                onClick={handleCollectStamp}
                className='block w-full px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-100'
                type='button'
              >
                Collect Stamp
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenuButton;
