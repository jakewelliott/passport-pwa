import { screen } from '@testing-library/react';
import { StampDetails } from '../../components/stamp-details';
import { useStamp } from '@/hooks/queries/useStamps';
import { usePark } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import DateHelper from '@/lib/date-helper';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the hooks
jest.mock('@/hooks/queries/useStamps');
jest.mock('@/hooks/queries/useParks');

const mockUseStamp = useStamp as jest.Mock;
const mockUsePark = usePark as jest.Mock;

describe('StampDetails', () => {
	const mockPark = api.getPark('ENRI');
	const mockStamp = {
		code: 'ENRI',
		timestamp: new Date('2024-01-01T12:00:00Z'),
		location: { latitude: 0, longitude: 0 }
	};
	const mockHandleClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockUsePark.mockReturnValue({ data: mockPark });
		mockUseStamp.mockReturnValue({ data: mockStamp });
	});

	it('renders stamp details correctly', () => {
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

		// Verify park name is displayed
		expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();

		// Verify collection date is displayed
		expect(screen.getByText(`Stamp collected on ${DateHelper.stringify(mockStamp.timestamp)}`)).toBeInTheDocument();
	});

	it('shows loading state when park data is loading', () => {
		mockUsePark.mockReturnValue({ data: null, isLoading: true });
		mockUseStamp.mockReturnValue({ data: null, isLoading: true });
	  
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		expect(screen.queryByText(mockPark.parkName)).not.toBeInTheDocument();
		expect(screen.queryByText(/Stamp collected on/)).not.toBeInTheDocument();
	  });

	  it('displays "Stamp not yet collected" when stamp is null', () => {
		mockUseStamp.mockReturnValue({ data: null, isLoading: false });
	  
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		expect(screen.getByText('Stamp not yet collected')).toBeInTheDocument();
	  });

	  it('displays "Stamp collected manually" for stamps without location', () => {
		const manualStamp = { ...mockStamp, location: null };
		mockUseStamp.mockReturnValue({ data: manualStamp, isLoading: false });
	  
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		expect(screen.getByText('Stamp collected manually')).toBeInTheDocument();
	  });

	  it('calls handleClose when close button is clicked', () => {
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		const closeButton = screen.getByLabelText('Close park details');
		closeButton.click();
	  
		expect(mockHandleClose).toHaveBeenCalledTimes(1);
	  });

	  it('calls handleClose when overlay is clicked', () => {
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		const overlay = screen.getByTestId('overlay');
		overlay.click();
	  
		expect(mockHandleClose).toHaveBeenCalledTimes(1);
	  });

	  it('renders park details link correctly', () => {
		renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);
	  
		const link = screen.getByText('View Park Details');
		expect(link).toHaveAttribute('href', '/locations/ENRI');
	  });
	  

	// it('shows loading state when park data is loading', () => {
	// 	mockUsePark.mockReturnValue({ data: null, isLoading: true });

	// 	renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });

});
