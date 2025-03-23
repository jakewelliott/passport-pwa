import { ImageModal } from '@/components/image-modal';
import { a11yOnClick } from '@/lib/a11y';
import type { Park } from '@/types';
import { useState } from 'react';

const NoPhotos = () => {
	return <div className='p-4 text-center'>No photos available for this location.</div>;
};

export const PhotoGalleryMiniTab = ({ park }: { park: Park }) => {
	const [selectedPhoto, setSelectedPhoto] = useState<Park['photos'][0] | null>(null);

	if (!park.photos || park.photos.length === 0) return <NoPhotos />;

	const handleOpen = (photo: Park['photos'][0]) => {
		setSelectedPhoto(photo);
	};

	const handleClose = () => {
		setSelectedPhoto(null);
	};

	return (
		<>
			<div className='z-0 grid w-full grid-cols-3'>
				{park.photos.map((photo, index) => (
					<div key={photo.photoPath} className='aspect-square cursor-pointer' {...a11yOnClick(() => handleOpen(photo))}>
						<img
							data-testid={'photo'}
							src={`/photos/${photo.photoPath}`}
							alt={photo.alt || `Park photo ${index + 1}`}
							className='h-full w-full object-cover transition-opacity duration-300 hover:opacity-80'
						/>
					</div>
				))}
			</div>
			{selectedPhoto && <ImageModal photo={selectedPhoto} onClose={handleClose} />}
		</>
	);
};
