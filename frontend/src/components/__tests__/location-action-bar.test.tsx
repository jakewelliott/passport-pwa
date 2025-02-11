import { render, screen } from '@testing-library/react';
import { LocationActionBar } from '@/components/tabs/locations/action-bar';
import { api } from '@/lib/mock/api';

describe('LocationActionBar', () => {
	const park = api.getParks()[0];

	it('renders navigation link with correct href', () => {
		render(<LocationActionBar park={park} />);
		const links = screen.getAllByRole('link');
		const navLink = links[0]; // First link is navigation
		expect(navLink).toHaveAttribute('href', `https://www.google.com/maps/place/${park.coordinates}`);
	});

	it('renders phone link with correct href', () => {
		render(<LocationActionBar park={park} />);
		const links = screen.getAllByRole('link');
		const phoneLink = links[1]; // Second link is phone
		expect(phoneLink).toHaveAttribute('href', `tel://${park.phone}`);
	});

	it('renders website link with correct href', () => {
		render(<LocationActionBar park={park} />);
		const links = screen.getAllByRole('link');
		const websiteLink = links[2]; // Third link is website
		if (park.website) {
			expect(websiteLink).toHaveAttribute('href', park.website);
		}
	});

	it('renders email link with correct href', () => {
		render(<LocationActionBar park={park} />);
		const links = screen.getAllByRole('link');
		const emailLink = links[3]; // Fourth link is email
		if (park.email) {
			expect(emailLink).toHaveAttribute('href', `mailto:${park.email}`);
		}
	});

	it('renders all action icons', () => {
		render(<LocationActionBar park={park} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(4); // Navigation, Phone, Website, and Email icons
	});
}); 