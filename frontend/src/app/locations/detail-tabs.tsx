import { LocationActionBar } from '@/app/locations/components/action-bar';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { LocationContact } from '@/app/locations/components/location-contact';
import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { useParams } from 'react-router-dom';

import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { usePark } from '@/hooks/queries/useParks';

export default function DetailTabs() {
	const { abbreviation } = useParams();
	const parkAbbreviation = abbreviation as Uppercase<string>;
	const { data: park, isLoading: isParkLoading } = usePark(parkAbbreviation);

	if (isParkLoading || !park) return <LoadingPlaceholder what='park' />;

	return (
		<>
			<LocationContact park={park} />
			<LocationActionBar park={park} />
			<LocationMiniTabBar>
				<DetailsMiniTab park={park} />
				<PhotoGalleryMiniTab photos={park.photos} />
				<NotesMiniTab abbreviation={park.abbreviation} parkId={park.id} />
			</LocationMiniTabBar>
		</>
	);
}
