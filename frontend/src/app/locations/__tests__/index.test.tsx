import { screen } from '@testing-library/react';
import { useParks } from '@/hooks/queries/useParks';
import Locations from '../index';
import { renderWithClient } from '@/lib/test-wrapper';
import { ParkSummary } from '@/lib/mock/types';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUseParks = useParks as jest.Mock;

describe('Locations', () => {
  // Create mock data that matches ParkSummary interface
  const mockParks: ParkSummary[] = [
    { parkName: "Test Park 1", abbreviation: "TP1", city: "Test City 1", state: "TS" },
    { parkName: "Test Park 2", abbreviation: "TP2", city: "Test City 2", state: "TS" },
  ];

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
    mockUseParks.mockReturnValue({ data: mockParks, isLoading: false });

    renderWithClient(<Locations />);

    // Check if all parks are rendered
    mockParks.forEach(park => {
      expect(screen.getByText(park.parkName)).toBeInTheDocument();
      expect(screen.getByText(`${park.city}, ${park.state}`)).toBeInTheDocument();
    });
  });
});
