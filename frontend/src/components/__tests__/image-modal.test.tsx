import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ImageModal } from '../image-modal';

// Mock react-zoom-pan-pinch as it's an external dependency
vi.mock('react-zoom-pan-pinch', () => ({
    TransformWrapper: ({ children }: { children: React.ReactNode }) => (
        <div data-testid='transform-wrapper'>{children}</div>
    ),
    TransformComponent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid='transform-component'>{children}</div>
    ),
}));

describe('ImageModal', () => {
    const mockOnClose = vi.fn();
    const mockPhoto = {
        photoPath: 'test-image.jpg',
        alt: 'Test Caption',
    };

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it('renders with image and caption', () => {
        render(<ImageModal photo={mockPhoto} onClose={mockOnClose} />);

        const img = screen.getByAltText('Test Caption');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/photos/test-image.jpg');
        expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    it('renders without caption', () => {
        const photoWithoutCaption = { photoPath: 'test-image.jpg' };
        render(<ImageModal photo={photoWithoutCaption} onClose={mockOnClose} />);

        const img = screen.getByAltText('Photo');
        expect(img).toBeInTheDocument();
        expect(screen.queryByText('Test Caption')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(<ImageModal photo={mockPhoto} onClose={mockOnClose} />);

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('renders with zoom wrapper components', () => {
        render(<ImageModal photo={mockPhoto} onClose={mockOnClose} />);

        expect(screen.getByTestId('transform-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('transform-component')).toBeInTheDocument();
    });

    it('has correct styling', () => {
        render(<ImageModal photo={mockPhoto} onClose={mockOnClose} />);

        const modal = screen.getByTestId('transform-wrapper').parentElement;
        expect(modal).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-system_black');
        expect(modal).toHaveStyle({ zIndex: 9999 });

        const closeButton = screen.getByText('×');
        expect(closeButton).toHaveClass(
            'absolute',
            'top-4',
            'right-6',
            'z-10',
            'cursor-pointer',
            'font-bold',
            'text-h1',
            'text-system_white',
        );

        const img = screen.getByAltText('Test Caption');
        expect(img).toHaveClass('max-h-screen', 'max-w-full', 'object-contain');

        const captionContainer = screen.getByTestId('caption-container');
        expect(captionContainer).toHaveClass(
            'absolute',
            'right-0',
            'bottom-4',
            'left-0',
            'bg-system_black',
            'bg-opacity-50',
            'p-2',
            'text-center',
            'text-system_white',
        );
    });
});
