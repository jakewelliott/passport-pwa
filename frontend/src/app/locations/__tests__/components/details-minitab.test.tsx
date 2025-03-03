import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { mockPark } from '@/lib/mock/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DetailsMiniTab', () => {
	it('renders establishment date when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		if (mockPark.establishedYear) {
			expect(screen.getByText('Established:')).toBeInTheDocument();
			expect(screen.getByText(mockPark.establishedYear)).toBeInTheDocument();
		}
	});

	it('renders landmark information when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		if (mockPark.landmark) {
			expect(screen.getByText('Landmark:')).toBeInTheDocument();
			expect(screen.getByText(mockPark.landmark)).toBeInTheDocument();
		}
	});

	it('renders "you can find" information when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		if (mockPark.youCanFind) {
			expect(screen.getByText('You can find...')).toBeInTheDocument();
			expect(screen.getByText(mockPark.youCanFind)).toBeInTheDocument();
		}
	});

	it('renders trails information when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		if (mockPark.trails) {
			expect(screen.getByText('Trails:')).toBeInTheDocument();
			expect(screen.getByText(String(mockPark.trails))).toBeInTheDocument();
		}
	});

	it('renders park icons container', () => {
		render(<DetailsMiniTab park={mockPark} />);
		const container = screen.getByTestId('icon-scroll-container');
		expect(container).toHaveClass('overflow-x-auto');
	});

	it('renders park icons when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		if (mockPark.icons.length > 0) {
			const iconContainer = screen.getByTestId('icon-scroll-container');
			const icons = iconContainer.querySelectorAll('img');
			expect(icons.length).toBe(mockPark.icons.length);

			for (let index = 0; index < icons.length; index++) {
				const icon = icons[index];
				expect(icon).toHaveAttribute('src', `/icons/park/${mockPark.icons[index].iconName}`);
				expect(icon).toHaveAttribute('alt', `Park icon ${index + 1}`);
				expect(icon).toHaveAttribute('width', '55');
				expect(icon).toHaveAttribute('height', '55');
			}
		}
	});
});
