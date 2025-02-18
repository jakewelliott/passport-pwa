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
            isLoading: true,
            isError: false,
            error: null
        });

        renderWithClient(<Locations />);
        expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
    });

    it('renders list of parks when data is available', () => {
        mockUseParks.mockReturnValue({
            data: mockParks,
            isLoading: false,
            isError: false,
            error: null
        });

        renderWithClient(<Locations />);

        const parkElements = screen.getAllByText(mockParks[0].parkName);
		expect(parkElements).toHaveLength(mockParks.length);
    });

    it('displays error message when there is an error', () => {
        const errorMessage = 'An error occurred';
        mockUseParks.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            error: { message: errorMessage }
        });

        renderWithClient(<Locations />);
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    it('displays "No parks found" when parks array is empty', () => {
        mockUseParks.mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
            error: null
        });

        renderWithClient(<Locations />);
        expect(screen.getByText('No parks found')).toBeInTheDocument();
    });

    it('renders park addresses correctly', () => {
        const parkWithAddress = {
            ...mockParks[0],
            addresses: [{ city: 'Test City', state: 'Test State' }]
        };
        mockUseParks.mockReturnValue({
            data: [parkWithAddress],
            isLoading: false,
            isError: false,
            error: null
        });

        renderWithClient(<Locations />);
        expect(screen.getByText('Test City, Test State')).toBeInTheDocument();
    });

    it('displays "Address not available" when park has no address', () => {
        const parkWithoutAddress = {
            ...mockParks[0],
            addresses: []
        };
        mockUseParks.mockReturnValue({
            data: [parkWithoutAddress],
            isLoading: false,
            isError: false,
            error: null
        });

        renderWithClient(<Locations />);
        expect(screen.getByText('Address not available')).toBeInTheDocument();
    });
});
