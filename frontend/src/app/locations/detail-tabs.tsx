import { ContactView } from '@/app/locations/components/contact-view';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { useParams } from 'react-router-dom';

import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { dbg } from '@/lib/debug';
import type { Park } from '@/types';
import AchievementsView from './components/achievements-view';
import { AddressView } from './components/address-view';

const MiniTabs = ({ park }: { park: Park }) => (
	<LocationMiniTabBar>
		<DetailsMiniTab park={park} />
		<PhotoGalleryMiniTab photos={park.photos} />
		<NotesMiniTab parkId={park.id} />
	</LocationMiniTabBar>
);

export default function DetailTabs() {
	dbg('RENDER', 'Location DetailTabs');
	const { abbreviation } = useParams();
	const parkAbbreviation = abbreviation as Uppercase<string>;

	const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);
	const { data: stamp, isLoading: isStampLoading } = useStamp(parkAbbreviation);

	if (isParkLoading || !park) return <LoadingPlaceholder what='park' />;
	if (isStampLoading || !stamp) return <LoadingPlaceholder what='stamp' />;

	return (
		<>
			<ContactView park={park} />
			<AddressView park={park} />
			<AchievementsView park={park} stamp={stamp} />
			<MiniTabs park={park} />
		</>
	);
}
