import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageModalProps {
  photo: {
    url: string;
    caption?: string;
  };
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-system_black flex items-center justify-center" style={{zIndex: 9999}}>
      <span className="absolute top-4 right-6 text-system_white text-h1 font-bold cursor-pointer z-10" onClick={onClose}>&times;</span>
      <TransformWrapper>
        <TransformComponent>
          <img 
            src={photo.url} 
            alt={photo.caption || 'Photo'} 
            className="max-w-full max-h-screen object-contain"
          />
        </TransformComponent>
      </TransformWrapper>
      {photo.caption && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-system_white bg-system_black bg-opacity-50 p-2">
          {photo.caption}
        </div>
      )}
    </div>
  );
};
