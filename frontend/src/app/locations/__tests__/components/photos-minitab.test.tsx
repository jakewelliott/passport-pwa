import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import { mockPark } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

const { render } = setupTestEnv();

const noPhotos = { ...mockPark, photos: [] };

describe('PhotoGalleryMiniTab', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    it('matches snapshot', () => {
        const { container } = render(<PhotoGalleryMiniTab park={mockPark} />);
        expect(container).toMatchSnapshot();
    });

    it('renders no photos message when photos array is empty', () => {
        render(<PhotoGalleryMiniTab park={noPhotos} />);
        expect(screen.getByText('No photos available for this location.')).toBeInTheDocument();
    });

    // ADAM: I chose not to delete these tests because they seem useful for edge cases

    it('renders all photos in a grid', () => {
        render(<PhotoGalleryMiniTab park={mockPark} />);
        const images = screen.getAllByTestId('photo');
        expect(images).toHaveLength(mockPark.photos.length);

        for (const [index, img] of images.entries()) {
            expect(img).toHaveAttribute('src', `/photos/${mockPark.photos[index].photoPath}`);
            expect(img).toHaveAttribute('alt', mockPark.photos[index].alt);
            expect(img).toHaveClass('h-full', 'w-full', 'object-cover');
        }
    });

    it('renders photos with fallback alt text when alt is not provided', () => {
        const photosWithoutAlt = [{ photoPath: '/test1.jpg', alt: '' }];
        const mockPark2 = { ...mockPark, photos: photosWithoutAlt };
        render(<PhotoGalleryMiniTab park={mockPark2} />);
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Park photo 1');
    });

    it('opens ImageModal when photo is clicked', () => {
        render(<PhotoGalleryMiniTab park={mockPark} />);
        const firstPhoto = screen.getAllByTestId('photo')[0];

        fireEvent.click(firstPhoto);

        // Check if modal is rendered
        const modalContainer = screen.getByRole('dialog', { hidden: true });
        expect(modalContainer).toBeInTheDocument();

        // Check if the correct image is displayed
        const modalImage = screen.getAllByRole('img').at(-1); // Get the last image (modal image)
        expect(modalImage).toHaveAttribute('src', `/photos/${mockPark.photos[0].photoPath}`);
        expect(modalImage).toHaveAttribute('alt', mockPark.photos[0].alt || 'Photo');
    });

    it('closes ImageModal when close button is clicked', () => {
        render(<PhotoGalleryMiniTab park={mockPark} />);

        // Open modal
        const firstPhoto = screen.getAllByRole('img')[0];
        fireEvent.click(firstPhoto);

        // Find and click close button (using the × symbol)
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        // Verify modal is closed by checking that only the grid images remain
        const remainingImages = screen.getAllByRole('img');
        expect(remainingImages).toHaveLength(mockPark.photos.length);
    });
});
