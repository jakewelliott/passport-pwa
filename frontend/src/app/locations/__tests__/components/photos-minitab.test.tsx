import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import type { Park } from '@/lib/mock/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('PhotoGalleryMiniTab', () => {
  const mockPhotos: Park['photos'] = [
    { photoPath: '/test1.jpg', alt: 'Test Caption 1' },
    { photoPath: '/test2.jpg', alt: 'Test Caption 2' },
    { photoPath: '/test3.jpg', alt: 'Park photo 3' },
  ];

  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

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

  it('renders photos with fallback alt text when alt is not provided', () => {
    const photosWithoutAlt = [{ photoPath: '/test1.jpg', alt: '' }];
    render(<PhotoGalleryMiniTab photos={photosWithoutAlt} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Park photo 1');
  });

  it('handles null photos prop gracefully', () => {
    // @ts-expect-error Testing invalid prop
    render(<PhotoGalleryMiniTab photos={null} />);
    expect(screen.getByText('No photos available for this location.')).toBeInTheDocument();
  });

  it('opens ImageModal when photo is clicked', () => {
    render(<PhotoGalleryMiniTab photos={mockPhotos} />);
    const firstPhoto = screen.getAllByRole('img')[0];

    fireEvent.click(firstPhoto);

    // Check if modal is rendered
    const modalContainer = screen.getByRole('dialog', { hidden: true });
    expect(modalContainer).toBeInTheDocument();

    // Check if the correct image is displayed
    const modalImage = screen.getAllByRole('img').at(-1); // Get the last image (modal image)
    expect(modalImage).toHaveAttribute('src', `/photos/${mockPhotos[0].photoPath}`);
    expect(modalImage).toHaveAttribute('alt', mockPhotos[0].alt || 'Photo');
  });

  it('closes ImageModal when close button is clicked', () => {
    render(<PhotoGalleryMiniTab photos={mockPhotos} />);

    // Open modal
    const firstPhoto = screen.getAllByRole('img')[0];
    fireEvent.click(firstPhoto);

    // Find and click close button (using the × symbol)
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Verify modal is closed by checking that only the grid images remain
    const remainingImages = screen.getAllByRole('img');
    expect(remainingImages).toHaveLength(mockPhotos.length);
  });
});
