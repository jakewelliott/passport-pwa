import { screen } from '@testing-library/react';
import { useParks } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import Locations from '../index';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUseParks = useParks as jest.Mock;

describe('Locations', () => {

	// it('shows loading state when data is loading', () => {
	// 	mockUseParks.mockReturnValue({
	// 		data: null,
	// 		isLoading: true
	// 	});

	// 	renderWithClient(<Locations />);
	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });

	const mockParks = api.getParks();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders list of parks when data is available', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});
	
		renderWithClient(<Locations />);
	
		const parkElements = screen.getAllByText(mockParks[0].parkName);
		expect(parkElements).toHaveLength(mockParks.length);
	});
	
	  

});
