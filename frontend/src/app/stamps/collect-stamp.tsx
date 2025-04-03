import RoundedButton from '@/components/rounded-button';
import { useStamp, useStampMutation } from '@/hooks/queries/useStamps';
import { useLocation } from '@/hooks/useLocation';
import { useParkCheck } from '@/hooks/useParkCheck';
import { a11yOnClick } from '@/lib/a11y';
import { dbg } from '@/lib/debug';
import type { CollectStampRequest } from '@/types/api';

export default function CollectStamp() {
    const { mutate: collectStamp } = useStampMutation();
    const { park, isLoading } = useParkCheck();
    const { geopoint } = useLocation();
    const { data: stamp, isLoading: stampLoading } = useStamp(park?.id);

    const hidden = stamp !== undefined || !park || !geopoint || isLoading || stampLoading;

    // This is AIDs. I will fix later.

    // useEffect(() => {
    // 	dbg('EFFECT', 'LoggedInRoutes');

    // 	// Initial check
    // 	if (park && !isAdmin && !isCollected(park.abbreviation, stamps ?? [])) {
    // 		setShowCollectModal(true);
    // 	}

    // 	// Set up interval for checking every 5 minutes
    // 	const interval = setInterval(
    // 		() => {
    // 			dbg('EFFECT', 'LoggedInRoutes', 'Checking if stamp is collected');
    // 			if (park && !isAdmin && !isCollected(park.abbreviation, stamps ?? [])) {
    // 				setShowCollectModal(true);
    // 			}
    // 		},
    // 		5 * 60 * 1000,
    // 	); // 5 minutes in milliseconds

    // 	// Cleanup interval on unmount
    // 	return () => clearInterval(interval);
    // }, [park, stamps, isAdmin]);

    const handleCollectStamp = () => {
        if (hidden) return; // keep ts happy

        const collected: CollectStampRequest = {
            parkId: park.id,
            geopoint,
            method: 'location',
            dateTime: new Date(),
            parkAbbreviation: park.abbreviation,
        };

        // mark the stamp as collected
        collectStamp(collected);
    };

    dbg('RENDER', 'CollectStamp', hidden);
    if (hidden) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-secondary_lightblue' style={{ zIndex: 9999 }}>
            <div className='m-auto flex max-w-3xl flex-col items-center gap-8 p-2 text-center'>
                <span
                    className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-supporting_darkgray'
                    {...a11yOnClick(close)}
                >
                    &times;
                </span>
                <h1 className='text-secondary_darkteal uppercase'>Woohoo!</h1>
                <p>
                    Your location indicates that you are at {park.parkName}. You have not collected the badge at this
                    location yet.{' '}
                </p>
                <RoundedButton title={'Collect!'} onClick={handleCollectStamp} />
                <div className='aspect-square w-48'>
                    <img src={`/stamps/${park.abbreviation}.svg`} alt={`${park.parkName} stamp`} />
                </div>
            </div>
        </div>
    );
}
