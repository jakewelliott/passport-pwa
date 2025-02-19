import { fireEvent, render, screen } from '@testing-library/react';
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
		expect(screen.getByText(`(${park.phone.toString().slice(0, 3)}) ${park.phone.toString().slice(3,6)}-${park.phone.toString().slice(6, 10)}`)).toBeInTheDocument();
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

	it('renders address line two when provided and adds <br /> element', () => {
		const parkWithLineTwoAddress = { ...park };
		parkWithLineTwoAddress.addresses[0] = {
		  ...parkWithLineTwoAddress.addresses[0],
		  addressLineTwo: "Heyy Whats uppppp"
		};
		
		render(<LocationContact park={parkWithLineTwoAddress} parkActivity={parkActivity} />);
		
		if (parkWithLineTwoAddress.addresses?.[0]) {
		  const addressText = screen.getByText((content, element) => {
			return element?.tagName.toLowerCase() === 'p' &&
			  content.includes(parkWithLineTwoAddress.addresses[0].addressLineOne) &&
			  content.includes(parkWithLineTwoAddress.addresses[0].addressLineTwo) &&
			  content.includes(parkWithLineTwoAddress.addresses[0].city) &&
			  content.includes(parkWithLineTwoAddress.addresses[0].state) &&
			  content.includes(parkWithLineTwoAddress.addresses[0].zipcode.toString());
		  });
		  expect(addressText).toBeInTheDocument();
		  
		  // Check if there are two <br /> elements in the address
		  const brElements = addressText.getElementsByTagName('br');
		  expect(brElements.length).toBe(3);
		}
	  });
	  

	it('hides multiple addresses', () => {
		const parkWithThreeAddresses = park;
		parkWithThreeAddresses.addresses.push(park.addresses[0]);
		parkWithThreeAddresses.addresses.push(park.addresses[0]);
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		var showMoreButton = screen.getByText('Show More');
		expect(showMoreButton).toBeInTheDocument();
		fireEvent.click(showMoreButton);
		const showLessButton = screen.getByText('Show Less');
		expect(showLessButton).toBeInTheDocument();
	});

	it('renders contact icons', () => {
		render(<LocationContact park={park} parkActivity={parkActivity} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(3); // At least Navigation, Phone, and Email icons
	});
}); 