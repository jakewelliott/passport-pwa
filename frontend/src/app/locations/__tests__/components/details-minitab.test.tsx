import { render, screen } from '@testing-library/react';
import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { api } from '@/lib/mock/api';
import { describe, it, expect } from 'vitest';

describe('DetailsMiniTab', () => {
	const park = api.getParks()[0];

	it('renders establishment date when provided', () => {
		render(<DetailsMiniTab park={park} />);
		if (park.establishedYear) {
			expect(screen.getByText('Established:')).toBeInTheDocument();
			expect(screen.getByText(park.establishedYear)).toBeInTheDocument();
		}
	});

	it('renders landmark information when provided', () => {
		render(<DetailsMiniTab park={park} />);
		if (park.landmark) {
			expect(screen.getByText('Landmark:')).toBeInTheDocument();
			expect(screen.getByText(park.landmark)).toBeInTheDocument();
		}
	});

	it('renders "you can find" information when provided', () => {
		render(<DetailsMiniTab park={park} />);
		if (park.youCanFind) {
			expect(screen.getByText('You can find...')).toBeInTheDocument();
			expect(screen.getByText(park.youCanFind)).toBeInTheDocument();
		}
	});

	it('renders trails information when provided', () => {
		render(<DetailsMiniTab park={park} />);
		if (park.trails) {
			expect(screen.getByText('Trails:')).toBeInTheDocument();
			expect(screen.getByText(String(park.trails))).toBeInTheDocument();
		}
	});

	it('renders park icons container', () => {
		render(<DetailsMiniTab park={park} />);
		const container = screen.getByTestId('icon-scroll-container');
		expect(container).toHaveClass('overflow-x-auto');
	});

	it('renders park icons when provided', () => {
		render(<DetailsMiniTab park={park} />);
		if (park.icons.length > 0) {
			const iconContainer = screen.getByTestId('icon-scroll-container');
			const icons = iconContainer.querySelectorAll('img');
			expect(icons.length).toBe(park.icons.length);

			icons.forEach((icon, index) => {
				expect(icon).toHaveAttribute('src', `/icons/park/${park.icons[index]}`);
				expect(icon).toHaveAttribute('alt', `Park icon ${index + 1}`);
				expect(icon).toHaveAttribute('width', '55');
				expect(icon).toHaveAttribute('height', '55');
			});
		}
	});
}); 