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

    it('matches snapshot', () => {
        const { container } = render(<ImageModal photo={mockPhoto} onClose={mockOnClose} />);
        expect(container).toMatchSnapshot();
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
});
