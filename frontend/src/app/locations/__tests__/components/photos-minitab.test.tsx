import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import type { Park } from '@/lib/mock/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('PhotoGalleryMiniTab', () => {
	const mockPhotos: Park['photos'] = [
		{ photoPath: '/test1.jpg', alt: 'Test Caption 1' },
		{ photoPath: '/test2.jpg', alt: 'Test Caption 2' },
		{ photoPath: '/test3.jpg', alt: 'Park photo 3' },
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
			expect(img).toHaveAttribute('src', `/photos/${mockPhotos[index].photoPath}`);
			expect(img).toHaveAttribute('alt', mockPhotos[index].alt);
			expect(img).toHaveClass('h-full', 'w-full', 'object-cover');
		}
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
