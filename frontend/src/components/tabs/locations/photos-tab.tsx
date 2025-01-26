import type React from 'react';
import { useState } from 'react';
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
    return <div className='p-4 text-center'>No photos available for this location.</div>;
  }

  const openModal = (photo: ParkPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className='z-0 grid w-full grid-cols-3'>
        {photos.map((photo, index) => (
          <div key={index} className='aspect-square cursor-pointer' onClick={() => openModal(photo)}>
            <img
              src={photo.url}
              alt={photo.caption || `Park photo ${index + 1}`}
              className='h-full w-full object-cover transition-opacity duration-300 hover:opacity-80'
            />
          </div>
        ))}
      </div>

      {selectedPhoto && <ImageModal photo={selectedPhoto} onClose={closeModal} />}
    </>
  );
};
