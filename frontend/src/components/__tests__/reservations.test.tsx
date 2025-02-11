import { render, screen } from '@testing-library/react';
import { Reservations } from '../tabs/more/reservations';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
	return render(
		<BrowserRouter>
			{component}
		</BrowserRouter>
	);
};

describe('Reservations', () => {
	it('renders the header correctly', () => {
		renderWithRouter(<Reservations />);

		const header = screen.getByText('MAKE A RESERVATION');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('pb-1', 'text-center', 'text-main_green');
	});

	it('renders reservation link and phone number', () => {
		renderWithRouter(<Reservations />);

		const link = screen.getByText('ncparks.gov/reservations');
		expect(link).toBeInTheDocument();
		expect(link).toHaveClass('p-mini');
		expect(link.closest('a')).toHaveAttribute('href', 'https://www.ncparks.gov/reservations');

		const phone = screen.getByText('1-877-722-6762');
		expect(phone).toBeInTheDocument();
		expect(phone).toHaveClass('p-mini');
	});

	it('renders descriptive text', () => {
		renderWithRouter(<Reservations />);

		const description = screen.getByText(
			'Reserve campsites, picnic shelters and other park facilities online or over the phone.'
		);
		expect(description).toBeInTheDocument();
		expect(description).toHaveClass('p-mini');
	});

	it('applies correct layout styling', () => {
		renderWithRouter(<Reservations />);

		const container = screen.getByText('MAKE A RESERVATION').closest('div')?.parentElement?.parentElement;
		expect(container).toHaveClass('p-4');

		const topSection = screen.getByText('MAKE A RESERVATION').closest('div')?.parentElement;
		expect(topSection).toHaveClass('mb-3', 'flex', 'items-center');

		const bottomSection = screen.getByText(
			'Reserve campsites, picnic shelters and other park facilities online or over the phone.'
		).closest('div');
		expect(bottomSection).toHaveClass('mt-3', 'flex', 'items-center');
	});
}); 