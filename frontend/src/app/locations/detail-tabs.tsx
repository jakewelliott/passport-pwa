import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { LocationContact } from '@/app/locations/components/location-contact';
import { LocationActionBar } from '@/app/locations/components/action-bar';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParams } from 'react-router-dom';

import { usePark, useParkActivity } from '@/hooks/queries/useParks';
import { LoadingPlaceholder } from '@/components/loading-placeholder';

export default function DetailTabs() {
	const { abbreviation } = useParams();
	const parkAbbreviation = abbreviation as Uppercase<string>;
	const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);
	const { data: parkActivity, isLoading: isActivityLoading } = useParkActivity(park?.id ?? 0);

	if (isParkLoading || isActivityLoading || !park || !parkActivity) return <LoadingPlaceholder />;

	return (
		<>
			<LocationContact park={park} parkActivity={parkActivity} />
			<LocationActionBar park={park} />
			<LocationMiniTabBar>
				<DetailsMiniTab park={park} />
				<PhotoGalleryMiniTab photos={park.photos} />
				<NotesMiniTab abbreviation={park.abbreviation} parkId={park.id} />
			</LocationMiniTabBar>
		</>
	);
}
