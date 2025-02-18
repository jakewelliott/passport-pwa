import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoGalleryMiniTab } from '@/app/locations/components/photos-minitab';
import type { Park } from '@/lib/mock/types';

// Mock the ImageModal component
jest.mock('@/components/image-modal', () => ({
  ImageModal: ({ photo, onClose }: { photo: Park['photos'][0], onClose: () => void }) => (
    <div data-testid="image-modal">
      <img src={`/photos/${photo.photoPath}`} alt={photo.alt} />
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('PhotoGalleryMiniTab', () => {
  const mockPhotos: Park['photos'] = [
    { photoPath: '/test1.jpg', alt: 'Test Caption 1' },
    { photoPath: '/test2.jpg', alt: 'Test Caption 2' },
    { photoPath: '/test3.jpg', alt: 'Park photo 3' }
  ];

  it('renders no photos message when photos array is empty', () => {
    render(<PhotoGalleryMiniTab photos={[]} />);
    expect(screen.getByText('No photos available for this location.')).toBeInTheDocument();
  });

  it('renders default alt text when no alt provided', () => {
    const mockPhotosWithNoAlt: Park['photos'] = [
      { photoPath: '/test1.jpg', alt: '' },
      { photoPath: '/test2.jpg', alt: '' },
      { photoPath: '/test3.jpg', alt: '' }
    ];
    render(<PhotoGalleryMiniTab photos={mockPhotosWithNoAlt} />);
    expect(screen.getAllByAltText(/Park photo /i)).toHaveLength(3);
    expect(screen.getByAltText('Park photo 1')).toBeInTheDocument();
  });

  it('renders all photos in a grid', () => {
    render(<PhotoGalleryMiniTab photos={mockPhotos} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockPhotos.length);

    for (const [index, img] of images.entries()) {
      expect(img).toHaveAttribute('src', '/photos/' + mockPhotos[index].photoPath);
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

  it('opens ImageModal when a photo is clicked', () => {
    render(<PhotoGalleryMiniTab photos={mockPhotos} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);

    expect(screen.getByTestId('image-modal')).toBeInTheDocument();
    expect(screen.getAllByAltText('Test Caption 1')).toHaveLength(2);
  });

  it('closes ImageModal when close button is clicked', () => {
    render(<PhotoGalleryMiniTab photos={mockPhotos} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
  });

});
