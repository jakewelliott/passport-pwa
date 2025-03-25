import { ContactView } from '@/app/locations/components/contact-view';
import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ContactView', () => {
	it('renders park name', () => {
		renderWithClient(<ContactView park={mockPark} />);
		expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();
	});

	it('renders GPS coordinates', () => {
		renderWithClient(<ContactView park={mockPark} />);
		expect(
			screen.getByText(`GPS: ${mockPark.coordinates.latitude}, ${mockPark.coordinates.longitude}`),
		).toBeInTheDocument();
	});

	it('renders phone number', () => {
		renderWithClient(<ContactView park={mockPark} />);
		expect(screen.getByText(mockPark.phone)).toBeInTheDocument();
	});

	it('renders email', () => {
		renderWithClient(<ContactView park={mockPark} />);
		if (mockPark.email) {
			expect(screen.getByText(mockPark.email)).toBeInTheDocument();
		}
	});

	it('renders contact icons', () => {
		renderWithClient(<ContactView park={mockPark} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(1);
	});
});
