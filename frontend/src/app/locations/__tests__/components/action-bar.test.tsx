import { LocationActionBar } from '@/app/locations/components/action-bar';
import { mockPark } from '@/lib/mock/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LocationActionBar', () => {
	it('renders navigation link with correct href', () => {
		render(<LocationActionBar park={mockPark} />);
		const links = screen.getAllByRole('link');
		const navLink = links[0]; // First link is navigation
		expect(navLink).toHaveAttribute(
			'href',
			`https://www.google.com/maps/place/${mockPark.coordinates.latitude},${mockPark.coordinates.longitude}`,
		);
	});

	it('renders phone link with correct href', () => {
		render(<LocationActionBar park={mockPark} />);
		const links = screen.getAllByRole('link');
		const phoneLink = links[1]; // Second link is phone
		expect(phoneLink).toHaveAttribute('href', `tel://${mockPark.phone}`);
	});

	it('renders website link with correct href', () => {
		render(<LocationActionBar park={mockPark} />);
		const links = screen.getAllByRole('link');
		const websiteLink = links[2]; // Third link is website
		if (mockPark.website) {
			expect(websiteLink).toHaveAttribute('href', mockPark.website);
		}
	});

	it('renders email link with correct href', () => {
		render(<LocationActionBar park={mockPark} />);
		const links = screen.getAllByRole('link');
		const emailLink = links[3]; // Fourth link is email
		if (mockPark.email) {
			expect(emailLink).toHaveAttribute('href', `mailto:${mockPark.email}`);
		}
	});

	it('renders all action icons', () => {
		render(<LocationActionBar park={mockPark} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(4); // Navigation, Phone, Website, and Email icons
	});
});
