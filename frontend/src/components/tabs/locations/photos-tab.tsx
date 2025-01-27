import type React from "react";
import { useState } from "react";
import { ImageModal } from "../../common/image-modal";
import { a11yOnClick } from "@/lib/a11y";
import type { ParkPhoto } from "@/lib/mock/types";

const NoPhotos = () => {
	return (
		<div className="p-4 text-center">
			No photos available for this location.
		</div>
	);
};

export const PhotoGallery = ({ photos }: { photos: ParkPhoto[] }) => {
	const [selectedPhoto, setSelectedPhoto] = useState<ParkPhoto | null>(null);

	if (photos.length === 0) return <NoPhotos />;

	const handleOpen = (photo: ParkPhoto) => {
		setSelectedPhoto(photo);
	};

	const handleClose = () => {
		setSelectedPhoto(null);
	};

	return (
		<>
			<div className="z-0 grid w-full grid-cols-3">
				{photos.map((photo, index) => (
					<div
						key={photo.url}
						className="aspect-square cursor-pointer"
						{...a11yOnClick(() => handleOpen(photo))}
					>
						<img
							src={photo.url}
							alt={photo.caption || `Park photo ${index + 1}`}
							className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80"
						/>
					</div>
				))}
			</div>

			{selectedPhoto && (
				<ImageModal photo={selectedPhoto} onClose={handleClose} />
			)}
		</>
	);
};
