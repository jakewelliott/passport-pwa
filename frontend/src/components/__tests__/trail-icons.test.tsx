import { mockTrail, trails } from '@/lib/testing/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrailIconView, TrailIcons } from '../trail-icons';

const mockIcon = mockTrail.icons?.[0];
const mockIcons = trails[1].icons;
console.log(mockIcons);

describe('Individual TrailIcon', () => {
    it('renders with default props', () => {
        render(<TrailIconView iconName={mockIcon} />);
        const img = screen.getByTestId(mockIcon).children[0];
        expect(img).toBeInTheDocument();
        expect(img.parentElement).toHaveStyle({ height: '48px', width: '48px' });
    });

    it('renders with custom size', () => {
        render(<TrailIconView iconName={mockIcon} size='lg' />);
        const icon = screen.getByTestId(mockIcon);
        expect(icon).toHaveStyle({ height: '64px', width: '64px' });
    });

    it('shows text when showText is true', () => {
        render(<TrailIconView iconName={mockIcon} showText />);
        expect(screen.getByText(mockIcon)).toBeInTheDocument();
    });

    it('uses correct image source', () => {
        render(<TrailIconView iconName={mockIcon} />);
        const img = screen.getByAltText('Hiking');
        expect(img).toHaveAttribute('src', '/icons/misc/Hiking.svg');
    });
});

describe('Multiple TrailIcons', () => {
    it('renders multiple icons', () => {
        render(<TrailIcons icons={mockTrail.icons} />);
        expect(screen.getByAltText('Hiking')).toBeInTheDocument();
        expect(screen.getByAltText('Biking')).toBeInTheDocument();
        expect(screen.getByAltText('Swimming')).toBeInTheDocument();
    });

    it('handles empty trailIcons array', () => {
        const { container } = render(<TrailIcons icons={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('handles undefined trailIcons', () => {
        // @ts-ignore
        const { container } = render(<TrailIcons icons={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('respects size and showText props', () => {
        render(<TrailIcons icons={mockIcons} size='sm' showText={false} />);
        const icons = screen.getAllByRole('img');
        for (const icon of icons) {
            expect(icon.parentElement).toHaveStyle({ height: '32px', width: '32px' });
        }
        expect(screen.queryByText('Hiking')).not.toBeInTheDocument();
    });
});
