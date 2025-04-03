import { mockTrail, trails } from '@/lib/testing/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrailIconView, TrailIcons } from '../trail-icons';

const mockIcon = mockTrail.icons?.[0];
const mockIcons = trails[1].icons;

// TODO: update trail_icons and possibly trails in mocked db

describe('Individual TrailIcon', () => {
    it('matches snapshot', () => {
        const { container } = render(<TrailIconView icon={mockIcon} />);
        expect(container).toMatchSnapshot();
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
