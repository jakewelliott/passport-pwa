import { render, screen } from '@testing-library/react';
import { TrailIcon, TrailIcons } from '../trail-icons';
import type { Trail } from '@/lib/mock/types';

describe('TrailIcon', () => {
	it('renders with default props', () => {
		render(<TrailIcon iconName="Hiking-Red" />);
		const img = screen.getByAltText('Hiking');
		expect(img).toBeInTheDocument();
		expect(img.parentElement).toHaveStyle({ height: '48px', width: '48px' });
	});

	it('renders with custom size', () => {
		render(<TrailIcon iconName="Biking-Red" size="lg" />);
		const img = screen.getByAltText('Biking');
		expect(img.parentElement).toHaveStyle({ height: '64px', width: '64px' });
	});

	it('shows text when showText is true', () => {
		render(<TrailIcon iconName="Swimming-Red" showText />);
		expect(screen.getByText('Swimming')).toBeInTheDocument();
	});

	it('uses correct image source', () => {
		render(<TrailIcon iconName="Camping-Green" />);
		const img = screen.getByAltText('Camping');
		expect(img).toHaveAttribute('src', '/icons/park/Camping-Green.svg');
	});
});

describe('TrailIcons', () => {
	const mockTrail = {
		trailIcons: ['Hiking-Red', 'Biking-Red', 'Swimming-Red'],
		trailName: 'Test Trail',
		distance: 5,
		description: 'A test trail'
	} as unknown as Trail;

	it('renders multiple icons', () => {
		render(<TrailIcons trail={mockTrail} />);
		expect(screen.getByAltText('Hiking')).toBeInTheDocument();
		expect(screen.getByAltText('Biking')).toBeInTheDocument();
		expect(screen.getByAltText('Swimming')).toBeInTheDocument();
	});

	it('handles empty trailIcons array', () => {
		const emptyTrail: Trail = {
			trailIcons: [],
			trailName: 'Empty Trail',
			distance: '0 miles',
			description: 'An empty trail'
		};
		const { container } = render(<TrailIcons trail={emptyTrail} />);
		expect(container.firstChild).toBeNull();
	});

	it('handles undefined trailIcons', () => {
		const undefinedTrail: Trail = {
			trailName: 'No Icons Trail',
			distance: '1 mile',
			description: 'A trail with no icons',
			trailIcons: []
		};
		const { container } = render(<TrailIcons trail={undefinedTrail} />);
		expect(container.firstChild).toBeNull();
	});

	it('respects size and showText props', () => {
		render(<TrailIcons trail={mockTrail} size="sm" showText={false} />);
		const icons = screen.getAllByRole('img');
		for (const icon of icons) {
			expect(icon.parentElement).toHaveStyle({ height: '32px', width: '32px' });
		}
		expect(screen.queryByText('Hiking')).not.toBeInTheDocument();
	});
}); 