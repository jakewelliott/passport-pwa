import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoGalleryMiniTab } from '@/components/tabs/locations/photos-minitab';
import type { ParkPhoto } from '@/lib/mock/types';

describe('PhotoGalleryMiniTab', () => {
	const mockPhotos: ParkPhoto[] = [
		{ url: '/test1.jpg', caption: 'Test Caption 1' },
		{ url: '/test2.jpg', caption: 'Test Caption 2' },
		{ url: '/test3.jpg' }
	];

	it('renders no photos message when photos array is empty', () => {
		render(<PhotoGalleryMiniTab photos={[]} />);
		expect(screen.getByText('No photos available for this location.')).toBeInTheDocument();
	});

	it('renders all photos in a grid', () => {
		render(<PhotoGalleryMiniTab photos={mockPhotos} />);
		const images = screen.getAllByRole('img');
		expect(images).toHaveLength(mockPhotos.length);

		for (const [index, img] of images.entries()) {
			expect(img).toHaveAttribute('src', mockPhotos[index].url);
			expect(img).toHaveAttribute('alt', mockPhotos[index].caption || `Park photo ${index + 1}`);
			expect(img).toHaveClass('h-full', 'w-full', 'object-cover');
		}
	});

	it('opens modal when clicking a photo', () => {
		render(<PhotoGalleryMiniTab photos={mockPhotos} />);
		const firstImage = screen.getByAltText('Test Caption 1');
		fireEvent.click(firstImage);

		// Modal should be open with the selected image
		const modalImage = screen.getAllByAltText('Test Caption 1')[1]; // Second instance is in the modal
		expect(modalImage).toBeInTheDocument();
	});

	it('closes modal when clicking close button', () => {
		render(<PhotoGalleryMiniTab photos={mockPhotos} />);

		// Open modal
		const firstImage = screen.getByAltText('Test Caption 1');
		fireEvent.click(firstImage);

		// Find and click close button (×)
		const closeButton = screen.getByText('×');
		fireEvent.click(closeButton);

		// Modal should be closed
		expect(screen.queryAllByAltText('Test Caption 1')).toHaveLength(1); // Only grid image should remain
	});

	it('applies hover styles to images', () => {
		render(<PhotoGalleryMiniTab photos={mockPhotos} />);
		const images = screen.getAllByRole('img');

		for (const img of images) {
			expect(img).toHaveClass('transition-opacity', 'duration-300', 'hover:opacity-80');
		}
	});

	it('renders grid with correct layout classes', () => {
		render(<PhotoGalleryMiniTab photos={mockPhotos} />);
		const grid = screen.getAllByRole('img')[0].closest('.grid');
		expect(grid).toHaveClass('grid-cols-3', 'w-full');
	});
}); 