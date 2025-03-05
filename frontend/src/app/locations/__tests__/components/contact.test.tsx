import { LocationContact } from '@/app/locations/components/location-contact';
import DateHelper from '@/lib/date-helper';
import { mockPark as park } from '@/lib/mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AchievementsView from '../../components/achievements-view';

describe('LocationContact', () => {
	it('renders park name', () => {
		render(<LocationContact park={park} />);
		expect(screen.getByText(park.parkName)).toBeInTheDocument();
	});

	it('renders GPS coordinates', () => {
		render(<LocationContact park={park} />);
		expect(screen.getByText(`GPS: ${park.coordinates.latitude}, ${park.coordinates.longitude}`)).toBeInTheDocument();
	});

	it('renders phone number', () => {
		render(<LocationContact park={park} />);
		expect(screen.getByText(park.phone)).toBeInTheDocument();
	});

	it('renders email', () => {
		render(<LocationContact park={park} />);
		if (park.email) {
			expect(screen.getByText(park.email)).toBeInTheDocument();
		}
	});

	it('renders address when provided', () => {
		render(<LocationContact park={park} />);
		if (park.addresses?.[0]) {
			const addressText = screen.getByText((content, element) => {
				return (
					element?.tagName.toLowerCase() === 'p' &&
					content.includes(park.addresses[0].addressLineOne) &&
					content.includes(park.addresses[0].city) &&
					content.includes(park.addresses[0].state) &&
					content.includes(park.addresses[0].zipcode.toString())
				);
			});
			expect(addressText).toBeInTheDocument();
		}
	});

	it('renders contact icons', () => {
		render(<LocationContact park={park} />);
		const svgElements = document.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThanOrEqual(1);
	});

	it('renders achievements', () => {
		render(<LocationContact park={park} />);
		const stampElement = screen.getByText('Stamp collected on 2/16/24 at 1:48 AM');
		expect(stampElement).toBeInTheDocument();
		expect(screen.queryAllByTestId('BLI').length).toBe(0);
	});

	it('shows correct stamp text', () => {
		render(<AchievementsView park={park} />);
		const stampElement = screen.getByText('Stamp not yet collected');
		expect(stampElement).toBeInTheDocument();
		render(<AchievementsView park={park} />);
		let stampElements = screen.getAllByText('Stamp not yet collected');
		const currentDate = new Date().toISOString();
		render(<AchievementsView park={park} />);
		stampElements = screen.getAllByText(
			`Stamp collected on ${DateHelper.stringify(new Date(currentDate)).replace(',', ' at')}`,
		);
		expect(stampElements.length).toEqual(1);
	});

	it('Renders bucket list items', () => {
		render(<AchievementsView park={park} />);
		const stampElements = screen.getByTestId('BLI');
		expect(stampElements).toBeInTheDocument();
	});

	it('renders unchecked bucket list icon when required', () => {
		render(<AchievementsView park={park} />);
		const stampElements = screen.getByTestId('BLI');
		expect(stampElements).toBeInTheDocument();
	});

	describe('multiple addresses', () => {
		it('shows only first two addresses by default', () => {
			const parkWithManyAddresses = {
				...park,
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

			render(<LocationContact park={parkWithManyAddresses} />);

			expect(screen.getByText(/Address 1/)).toBeInTheDocument();
			expect(screen.getByText(/Address 2/)).toBeInTheDocument();
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();
			expect(screen.getByText('Show More')).toBeInTheDocument();
		});

		it('toggles between showing all addresses and collapsing them', () => {
			const parkWithManyAddresses = {
				...park,
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

			render(<LocationContact park={parkWithManyAddresses} />);

			// Initially only shows 2 addresses
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();

			// Click "Show More"
			fireEvent.click(screen.getByText('Show More'));

			// Should now show all addresses
			expect(screen.getByText(/Address 1/)).toBeInTheDocument();
			expect(screen.getByText(/Address 2/)).toBeInTheDocument();
			expect(screen.getByText(/Address 3/)).toBeInTheDocument();
			expect(screen.getByText('Show Less')).toBeInTheDocument();

			// Click "Show Less"
			fireEvent.click(screen.getByText('Show Less'));

			// Should hide the third address again
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();
			expect(screen.getByText('Show More')).toBeInTheDocument();
		});
	});
});
