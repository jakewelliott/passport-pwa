import { TrailDetailView } from '@/app/more/components/trail-details';
import { TrailMap } from '@/app/more/components/trail-map';
import { useTrails } from '@/hooks/queries/useTrails';

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
    // TODO: make a hook for this
    const { data: trailDetails, isLoading } = useTrails();

    if (isLoading) return <div>Loading</div>;

    return (
        <div className='flex flex-col gap-4'>
            {trailDetails?.map((trail) => (
                <TrailDetailView trail={trail} key={trail.id} />
            ))}
            <LogoAndLink />
            <TrailMap />
        </div>
    );
};
