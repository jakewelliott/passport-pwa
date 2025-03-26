import { a11yOnClick } from '@/lib/a11y';
import type React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface ImageModalProps {
    photo: {
        photoPath: string;
        alt?: string;
    };
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
    return (
        <dialog
            aria-modal='true'
            className='fixed inset-0 flex items-center justify-center bg-system_black'
            style={{ zIndex: 9999 }}
        >
            <span
                className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-system_white'
                style={{ textShadow: '0 0 4px #444444' }}
                {...a11yOnClick(onClose)}
            >
                &times;
            </span>
            <TransformWrapper>
                <TransformComponent>
                    <img
                        src={photo.photoPath}
                        alt={photo.alt || 'Photo'}
                        className='max-h-screen max-w-full object-contain'
                    />
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
    );
};
