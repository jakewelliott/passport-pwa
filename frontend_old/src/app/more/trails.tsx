import { TrailDetailView } from '@/app/more/components/trail-details';
import { TrailMap } from '@/app/more/components/trail-map';
import { EditTrailModal } from '@/components/edit-trail-modal';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import RoundedButton from '@/components/rounded-button';
import { useTrails } from '@/hooks/queries/useTrails';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import type { Trail } from '@/types';
import { useState } from 'react';

const LogoAndLink = () => {
    return (
        <>
            <img src='/TrailsLogo.svg' alt='Trails Logo' />
            <p className='text-center'>
                For maps and additional information on these state trails, please visit{' '}
                <a href='https://trails.nc.gov/state-trails' className='text-main_blue'>
                    trails.nc.gov/state-trails
                </a>
            </p>
        </>
    );
};

export const Trails = () => {
    dbg('RENDER', '/more/trails');
    // TODO: make a hook for this
    const { data: trailDetails, isLoading } = useTrails();
    const { data: user } = useUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trailToEdit, setTrailToEdit] = useState<Trail | undefined>();

    const handleEditTrailPress = (trail: Trail) => {
        setTrailToEdit(trail);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setTrailToEdit(undefined);
        setIsEditModalOpen(false);
    };

    if (isLoading) return <LoadingPlaceholder what='trails' />;

    return (
        <>
            <div className='flex flex-col gap-4'>
                {trailDetails?.map((trail) => (
                    <TrailDetailView trail={trail} key={trail.id} handleEditTrail={() => handleEditTrailPress(trail)} />
                ))}
                {user?.role === 'admin' && (
                    <div className='w-60'>
                        <RoundedButton
                            type='button'
                            onClick={() => {
                                setIsEditModalOpen(true);
                            }}
                            title='+ New Trail'
                        />
                    </div>
                )}
                <LogoAndLink />
                <TrailMap />
            </div>
            {isEditModalOpen && (
                <EditTrailModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    isNew={trailToEdit === undefined}
                    trailProp={trailToEdit}
                />
            )}
        </>
    );
};
