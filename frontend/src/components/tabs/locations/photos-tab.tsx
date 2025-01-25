import React, { useState } from 'react';
import { ImageModal } from '../../common/image-modal';

interface ParkPhoto {
  url: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: ParkPhoto[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ParkPhoto | null>(null);

  if (photos.length === 0) {
    return <div className="text-center p-4">No photos available for this location.</div>;
  }

  const openModal = (photo: ParkPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 w-full z-0">
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square cursor-pointer" onClick={() => openModal(photo)}>
            <img 
              src={photo.url} 
              alt={photo.caption || `Park photo ${index + 1}`}
              className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>

      {selectedPhoto && <ImageModal photo={selectedPhoto} onClose={closeModal} />}
    </>
  );
};
