import { AddressView } from '@/app/locations/components/address-view';
import { ContactView } from '@/app/locations/components/contact-view';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationActionBar } from '@/app/locations/components/location-action-bar';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { BucketList } from '@/components/bucket-list';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { StampCollectedOn } from '@/components/stamp-collected-on';
import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import type { Park } from '@/types';
import { useParams } from 'react-router';

// TODO: styling here needs to be fixed
const MiniTabs = ({ park }: { park: Park }) => (
    <div className='relative right-4 flex w-svw flex-col'>
        <LocationActionBar park={park} />
        <LocationMiniTabBar>
            <DetailsMiniTab park={park} />
            <PhotoGalleryMiniTab park={park} />
            <NotesMiniTab parkId={park.id} />
        </LocationMiniTabBar>
    </div>
);

/**
 * Park Info screen
 *
 * Shows detailed information about a park, state is in the URL
 *
 * @returns {React.ReactNode} The park info screen
 */
export default function ParkInfoScreen() {
    const { abbreviation } = useParams();
    const parkAbbreviation = abbreviation as Uppercase<string>;
    dbg('RENDER', `/locations/${parkAbbreviation}`);

    const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);
    const { data: stamp, isLoading: isStampLoading } = useStamp(park?.id);

    if (isParkLoading || !park) return <LoadingPlaceholder what='park' />;
    if (isStampLoading) return <LoadingPlaceholder what='stamp' />;

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
                <div className='text-center'>
                    <h2>{park.parkName}</h2>
                </div>
                <AddressView park={park} />
                <ContactView park={park} />
                <StampCollectedOn stamp={stamp} />

                <BucketList parkId={park.id} />
            </div>

            <MiniTabs park={park} />
        </div>
    );
}
