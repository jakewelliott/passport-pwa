import { trails } from '@/lib/testing/mock/tables';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrailIcon, TrailIcons } from '../trail-icons';

const mockTrail = { ...trails[0], trailIcons: ['Hiking-Red', 'Biking-Red', 'Swimming-Red'] };

describe('TrailIcon', () => {
    it('renders with default props', () => {
        render(<TrailIcon iconName='Hiking-Red' />);
        const img = screen.getByAltText('Hiking');
        expect(img).toBeInTheDocument();
        expect(img.parentElement).toHaveStyle({ height: '48px', width: '48px' });
    });

    it('renders with custom size', () => {
        render(<TrailIcon iconName='Biking-Red' size='lg' />);
        const img = screen.getByAltText('Biking');
        expect(img.parentElement).toHaveStyle({ height: '64px', width: '64px' });
    });

    it('shows text when showText is true', () => {
        render(<TrailIcon iconName='Swimming-Red' showText />);
        expect(screen.getByText('Swimming')).toBeInTheDocument();
    });

    it('uses correct image source', () => {
        render(<TrailIcon iconName='Camping-Green' />);
        const img = screen.getByAltText('Camping');
        expect(img).toHaveAttribute('src', '/icons/park/Camping-Green.svg');
    });

    it('renders multiple icons', () => {
        render(<TrailIcons trail={mockTrail} />);
        expect(screen.getByAltText('Hiking')).toBeInTheDocument();
        expect(screen.getByAltText('Biking')).toBeInTheDocument();
        expect(screen.getByAltText('Swimming')).toBeInTheDocument();
    });

    it('handles empty trailIcons array', () => {
        const { container } = render(<TrailIcons trail={{ ...mockTrail, trailIcons: [] }} />);
        expect(container.firstChild).toBeNull();
    });

    it('handles undefined trailIcons', () => {
        // @ts-ignore
        const { container } = render(<TrailIcons trail={{ ...mockTrail, trailIcons: undefined }} />);
        expect(container.firstChild).toBeNull();
    });

    it('respects size and showText props', () => {
        render(<TrailIcons trail={mockTrail} size='sm' showText={false} />);
        const icons = screen.getAllByRole('img');
        for (const icon of icons) {
            expect(icon.parentElement).toHaveStyle({ height: '32px', width: '32px' });
        }
        expect(screen.queryByText('Hiking')).not.toBeInTheDocument();
    });
});
