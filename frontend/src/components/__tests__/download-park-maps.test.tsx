import { render, screen } from '@testing-library/react';
import { DownloadParkMaps } from '../tabs/more/download-park-maps';

// Mock react-icons/ri
jest.mock('react-icons/ri', () => ({
	RiMap2Line: () => <div data-testid="map-icon" />
}));

describe('DownloadParkMaps', () => {
	it('renders the header correctly', () => {
		render(<DownloadParkMaps />);

		const header = screen.getByText('DOWNLOAD PARK MAPS');
		expect(header).toBeInTheDocument();
		expect(header.parentElement).toHaveClass('bg-secondary_orange', 'p-2', 'text-center', 'text-system_white');
	});

	it('renders the map icon', () => {
		render(<DownloadParkMaps />);

		const mapIcon = screen.getByTestId('map-icon');
		expect(mapIcon).toBeInTheDocument();
		expect(mapIcon.parentElement).toHaveClass('-ml-8', 'float-left');
	});

	it('renders the descriptive text correctly', () => {
		render(<DownloadParkMaps />);

		expect(screen.getByText(/Save paper and save trees/)).toBeInTheDocument();
		expect(screen.getByText(/Go to ncparks\.gov/)).toBeInTheDocument();
	});

	it('renders text content in a centered paragraph', () => {
		render(<DownloadParkMaps />);

		const textContainer = screen.getByText(/Save paper/).closest('p');
		expect(textContainer).toHaveClass('text-center');
	});
}); 