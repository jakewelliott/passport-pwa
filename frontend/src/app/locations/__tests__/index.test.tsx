import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useParks } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import Locations from '../index';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUseParks = useParks as jest.Mock;

describe('Locations', () => {
	const mockParks = api.getParks();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const renderLocations = () => {
		render(
			<BrowserRouter>
				<Locations />
			</BrowserRouter>
		);
	};

	it('shows loading placeholder when data is loading', () => {
		mockUseParks.mockReturnValue({
			data: null,
			isLoading: true
		});

		renderLocations();
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('shows loading placeholder when parks data is null', () => {
		mockUseParks.mockReturnValue({
			data: null,
			isLoading: false
		});

		renderLocations();
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders list of parks when data is available', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderLocations();

		// Check if all parks are rendered
		mockParks.forEach(park => {
			expect(screen.getByText(park.name)).toBeInTheDocument();
			expect(screen.getByText(`${park.city}, NC`)).toBeInTheDocument();
		});
	});

	it('renders parks with correct link structure', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderLocations();

		// Check if each park has the correct link
		mockParks.forEach(park => {
			const parkLink = screen.getByText(park.name).closest('a');
			expect(parkLink).toHaveAttribute('href', `/locations/${park.abbreviation}`);
			expect(parkLink).toHaveClass('text-supporting_inactiveblue', 'no-underline');
		});
	});

	it('renders parks in list row components', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderLocations();

		// Check if each park is wrapped in a list row with correct margin
		mockParks.forEach(park => {
			const parkContainer = screen.getByText(park.name).closest('.m-3');
			expect(parkContainer).toBeInTheDocument();
		});
	});
});
