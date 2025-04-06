import { a11yOnClick } from '@/lib/a11y';
import type React from 'react';
import { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface ImageModalProps {
    photo: {
        photoPath: string;
        alt?: string;
    };
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        setDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight,
        });
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center' style={{ zIndex: 9999 }}>
            <div className='absolute inset-0 bg-system_black bg-opacity-70 backdrop-blur-md backdrop-filter' />
            <dialog
                aria-modal='true'
                className='relative flex h-full w-full items-center justify-center bg-system_black bg-opacity-0'
            >
                <span
                    className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-system_white'
                    style={{ textShadow: '0 0 4px #444444' }}
                    {...a11yOnClick(onClose)}
                >
                    &times;
                </span>
                <TransformWrapper minScale={1} maxScale={10} initialScale={1} centerOnInit>
                    <TransformComponent wrapperClass='!w-full !h-full'>
                        <div className='flex h-full w-full items-center justify-center'>
                            <img
                                src={photo.photoPath.startsWith('http://') || photo.photoPath.startsWith('https://') ? photo.photoPath : photo.photoPath}
                                alt={photo.alt || 'Photo'}
                                className='object-contain'
                                style={{
                                    width: `${dimensions.width}px`,
                                    height: `${dimensions.height}px`,
                                    maxWidth: '100vw',
                                    maxHeight: '100vh',
                                }}
                                onLoad={handleImageLoad}
                            />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
                {photo.alt && (
                    <div
                        data-testid='caption-container'
                        className='absolute right-0 bottom-4 left-0 bg-system_black bg-opacity-50 p-2 text-center text-system_white'
                    >
                        {photo.alt}
                    </div>
                )}
            </dialog>
        </div>
    );
};
