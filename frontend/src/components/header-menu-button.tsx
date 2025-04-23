import { EditParkModal } from '@/components/edit-park-modal';
import { useFavoriteParks } from '@/hooks/queries/useParkFavorites';
import { useParks } from '@/hooks/queries/useParks';
import { useStampMutation } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { useLocation as useLocationHook } from '@/hooks/useLocation';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useParkCheck } from '@/hooks/useParkCheck';
import { dbg } from '@/lib/debug';
import type { CollectStampRequest } from '@/types/api';
import { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

export const HeaderMenuButton = () => {
    dbg('RENDER', 'ManualStampButton');

    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { mutate } = useStampMutation();
    const { geopoint } = useLocationHook();
    const { data, markFavorite, removeFavorite } = useFavoriteParks();
    const { isAdmin } = useUser();

    // get the park from the pathname
    const { pathname } = useLocation();
    const { pageTitle } = usePageTitle();
    const { data: parks } = useParks();
    const { park: parkCheck, isLoading: parkCheckLoading } = useParkCheck();
    const park = parks?.find((p) => p.abbreviation === pathname.split('/').pop());
    const [isFavorite, setIsFavorite] = useState(park ? data?.includes(park?.id) : false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const showForAdmin = isAdmin && pageTitle === 'Locations';
    const showForParkDetails = park && pageTitle === 'Park Details';

    // if we can't find the park, return null
    if (!showForParkDetails && !showForAdmin) return null;

    let method = 'manual';

    const handleCollectStampPress = () => {
        if (!geopoint) {
            toast.error('Unable to see your current location.');
            return;
        }

        if (!parkCheckLoading && parkCheck === park?.id) method = 'location';

        const update: CollectStampRequest = {
            geopoint,
            method: method,
            dateTime: new Date(),
            parkId: park?.id || 0,
            parkAbbreviation: park?.abbreviation || '',
        };

        mutate(update);

        setIsOpen(false);
    };

    const handleToggleFavoritePress = () => {
        if (isFavorite) {
            removeFavorite(park?.id || 0, {
                onSuccess: () => {
                    setIsFavorite(false);
                    toast.success('Park removed from favorites');
                },
            });
        } else {
            markFavorite(park?.id || 0, {
                onSuccess: () => {
                    setIsFavorite(true);
                    toast.success('Park added to favorites');
                },
            });
        }

        setIsOpen(false);
    };

    const handleEditParkPress = () => {
        setIsEditModalOpen(true);
        setIsOpen(false);
    };

    return (
        <>
            <div className='relative' ref={menuRef}>
                {(pageTitle === 'Locations' || pageTitle === 'Park Details') && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='flex items-center p-2 text-system-white'
                        type='button'
                        aria-label='Open menu'
                    >
                        <FaEllipsisV />
                    </button>
                )}

                {isOpen && (
                    <div
                        className='absolute top-full right-0 mt-2 w-48 rounded-md bg-system-white shadow-lg ring-1 ring-black ring-opacity-5'
                        style={{ zIndex: 9999 }}
                    >
                        <div className='py-1'>
                            {pageTitle === 'Park Details' && (
                                <>
                                    <button
                                        className='block w-full px-4 py-2 text-left '
                                        type='button'
                                        onClick={handleCollectStampPress}
                                    >
                                        Collect Stamp
                                    </button>
                                    <button
                                        className='block w-full px-4 py-2 text-left'
                                        type='button'
                                        onClick={handleToggleFavoritePress}
                                    >
                                        {isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
                                    </button>
                                </>
                            )}
                            {isAdmin && (
                                <button
                                    className='block w-full px-4 py-2 text-left'
                                    type='button'
                                    onClick={handleEditParkPress}
                                >
                                    {pageTitle === 'Locations' ? 'New' : 'Edit'} Park
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {isEditModalOpen && (
                <EditParkModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    parkProp={park}
                    isNew={pageTitle === 'Locations'}
                />
            )}
        </>
    );
};
