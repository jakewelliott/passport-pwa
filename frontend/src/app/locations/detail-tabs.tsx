import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { LocationContact } from '@/app/locations/components/contact';
import { LocationActionBar } from '@/app/locations/components/action-bar';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParams } from 'react-router-dom';

import { usePark } from '@/hooks/queries/useParks';
import { LoadingPlaceholder } from '@/components/loading-placeholder';

export default function DetailTabs() {
	const { abbreviation } = useParams();
	const parkAbbreviation = abbreviation as Uppercase<string>;
	const { data: park, isLoading } = usePark(parkAbbreviation);

	if (isLoading || !park) return <LoadingPlaceholder />;

	return (
		<>
			<LocationContact park={park} />
			<LocationActionBar park={park} />
			<LocationMiniTabBar>
				<DetailsMiniTab park={park} />
				<PhotoGalleryMiniTab photos={park.parkPhotos} />
				<NotesMiniTab abbreviation={park.abbreviation} />
			</LocationMiniTabBar>
		</>
	);
}
