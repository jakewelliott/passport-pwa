import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppInfo } from '@/app/more/app-info';

describe('AppInfo Component - User Stories', () => {
	// User Story: As a user, I want to see the app name and branding
	it('should display app name and branding', () => {
		render(
			<BrowserRouter>
				<AppInfo />
			</BrowserRouter>
		);

		expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
		expect(screen.getByText('Passport')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see contact information
	it('should display contact information', () => {
		render(
			<BrowserRouter>
				<AppInfo />
			</BrowserRouter>
		);

		expect(screen.getByText('CONTACT US')).toBeInTheDocument();
		expect(screen.getByText('NC Division of Parks and Recreation')).toBeInTheDocument();
		expect(screen.getByText('(919) 707-9300')).toBeInTheDocument();
	});

	// User Story: As a user, I want to access park maps
	it('should display park maps information', () => {
		render(
			<BrowserRouter>
				<AppInfo />
			</BrowserRouter>
		);

		expect(screen.getByText('DOWNLOAD PARK MAPS')).toBeInTheDocument();
		expect(screen.getByText(/Save paper and save trees/i)).toBeInTheDocument();
	});

	// User Story: As a user, I want to make reservations
	it('should display reservation information', () => {
		render(
			<BrowserRouter>
				<AppInfo />
			</BrowserRouter>
		);

		expect(screen.getByText('MAKE A RESERVATION')).toBeInTheDocument();
		expect(screen.getByText('1-877-722-6762')).toBeInTheDocument();
		expect(screen.getByText('ncparks.gov/reservations')).toBeInTheDocument();
	});

	// User Story: As a user, I want to find social media links
	it('should display social media links', () => {
		render(
			<BrowserRouter>
				<AppInfo />
			</BrowserRouter>
		);

		const links = screen.getAllByRole('link');
		const socialLinks = links.filter(link =>
			link.getAttribute('href')?.includes('facebook.com') ||
			link.getAttribute('href')?.includes('instagram.com') ||
			link.getAttribute('href')?.includes('youtube.com')
		);

		expect(socialLinks).toHaveLength(3);
		expect(socialLinks[0]).toHaveAttribute('href', 'https://www.facebook.com/NorthCarolinaStateParks/');
		expect(socialLinks[1]).toHaveAttribute('href', 'https://www.instagram.com/ncstateparks/');
		expect(socialLinks[2]).toHaveAttribute('href', 'https://www.youtube.com/@parksNC');
	});
}); 