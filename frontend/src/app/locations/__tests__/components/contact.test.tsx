import { render, screen } from '@testing-library/react';
import { LocationContact } from '@/app/locations/components/location-contact';
import { api } from '@/lib/mock/api';

describe('LocationContact', () => {
	const park = api.getParks()[0];
	const parkActivity = api.getParkActivity()[0];

	it('renders park name', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		expect(screen.getByText(park.parkName)).toBeInTheDocument();
	});

	it('renders GPS coordinates', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		expect(screen.getByText(`GPS: ${park.coordinates.latitude}, ${park.coordinates.longitude}`)).toBeInTheDocument();
	});

	it('renders phone number', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		expect(screen.getByText(park.phone)).toBeInTheDocument();
	});

	it('renders email', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		if (park.email) {
			expect(screen.getByText(park.email)).toBeInTheDocument();
		}
	});

	it('renders address when provided', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		if (park.addresses?.[0]) {
			const addressText = screen.getByText((content, element) => {
				return element?.tagName.toLowerCase() === 'p' &&
					content.includes(park.addresses[0].addressLineOne) &&
					content.includes(park.addresses[0].city) &&
					content.includes(park.addresses[0].state) &&
					content.includes(park.addresses[0].zipcode.toString());
			});
			expect(addressText).toBeInTheDocument();
		}
	});

	it('renders contact icons', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(3); // At least Navigation, Phone, and Email icons
	});
}); 