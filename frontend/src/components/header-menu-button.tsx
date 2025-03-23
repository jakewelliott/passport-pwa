import { useParks } from '@/hooks/queries/useParks';
import { useStampMutation } from '@/hooks/queries/useStamps';
import { useLocation as useLocationHook } from '@/hooks/useLocation';
import { dbg } from '@/lib/debug';
import type { CollectStampRequest } from '@/types/api';
import { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ManualStampButton = () => {
  dbg('RENDER', 'ManualStampButton');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate } = useStampMutation();
  const { geopoint } = useLocationHook();

  // get the park from the pathname
  const { pathname } = useLocation();
  const { data: parks } = useParks();
  const park = parks?.find((p) => p.abbreviation === pathname.split('/').pop());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // if we can't find the park, return null
  if (!park) return null;

  const handlePress = () => {
    if (!geopoint) {
      toast.error('Unable to see your current location.');
      return;
    }

    const update: CollectStampRequest = {
      geopoint,
      method: 'manual',
      dateTime: new Date(),
      parkId: park?.id,
      parkAbbreviation: park?.abbreviation,
    };

    mutate(update);

    setIsOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center p-2 text-system_white'
        type='button'
        aria-label='Open menu'
      >
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 mt-2 w-48 rounded-md bg-system_white shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            <button
              className='block w-full px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-100'
              type='button'
              onClick={handlePress}
            >
              Collect Stamp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
