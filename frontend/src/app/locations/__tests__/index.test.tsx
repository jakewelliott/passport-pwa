import { screen } from '@testing-library/react';
import { useParks } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import Locations from '../index';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUseParks = useParks as jest.Mock;

describe('Locations', () => {
	const mockParks = api.getParks();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('shows loading state when data is loading', () => {
		mockUseParks.mockReturnValue({
			data: null,
			isLoading: true
		});

		renderWithClient(<Locations />);
		expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	});

	it('renders list of parks when data is available', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderWithClient(<Locations />);

		// Check if all parks are rendered
		mockParks.forEach(park => {
			expect(screen.getByText(park.name)).toBeInTheDocument();
			// expect(screen.getByText(park.address[0].city)).toBeInTheDocument();
		});
	});

});
