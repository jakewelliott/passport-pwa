import { ContactView } from '@/app/locations/components/contact-view';
import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const parkWithManyAddresses = {
	...mockPark,
	addresses: [
		{
			title: 'Address 1',
			addressLineOne: 'Address 1',
			addressLineTwo: '',
			city: 'City1',
			state: 'ST',
			zipcode: 12345,
		},
		{
			title: 'Address 2',
			addressLineOne: 'Address 2',
			addressLineTwo: '',
			city: 'City2',
			state: 'ST',
			zipcode: 12346,
		},
		{
			title: 'Address 3',
			addressLineOne: 'Address 3',
			addressLineTwo: '',
			city: 'City3',
			state: 'ST',
			zipcode: 12347,
		},
	],
};

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
