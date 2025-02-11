import { render, screen } from '@testing-library/react';
import { StampDetails } from '../../components/stamp-details';
import { useStamp } from '@/hooks/useStamps';
import { usePark } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import DateHelper from '@/lib/date-helper';

// Mock the hooks
jest.mock('@/hooks/useStamps');
jest.mock('@/hooks/queries/useParks');

const mockUseStamp = useStamp as jest.Mock;
const mockUsePark = usePark as jest.Mock;

describe('StampDetails', () => {
	const mockPark = api.getParks()[0];
	const mockStamp = {
		code: mockPark.abbreviation,
		timestamp: new Date('2024-03-15T12:00:00Z'),
		location: { latitude: 0, longitude: 0 }
	};
	const mockHandleClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('shows loading placeholder when park is loading', () => {
		mockUsePark.mockReturnValue({
			data: null,
			isLoading: true
		});
		mockUseStamp.mockReturnValue({
			data: mockStamp,
			isLoading: false
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);
		expect(screen.getByText('Loading park...')).toBeInTheDocument();
	});

	it('shows loading placeholder when stamp is loading', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: null,
			isLoading: true
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);
		expect(screen.getByText('Loading stamp...')).toBeInTheDocument();
	});

	it('renders park details when stamp is collected', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: mockStamp,
			isLoading: false
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);

		expect(screen.getByText(mockPark.name)).toBeInTheDocument();
		expect(screen.getByText(mockPark.city)).toBeInTheDocument();
		expect(screen.getByText(`Stamp collected on ${DateHelper.stringify(mockStamp.timestamp)}`)).toBeInTheDocument();
	});

	it('shows manually collected message when location is null', () => {
		const manualStamp = { ...mockStamp, location: null };
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: manualStamp,
			isLoading: false
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);
		expect(screen.getByText('Stamp collected manually')).toBeInTheDocument();
	});

	it('includes link to park details', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: mockStamp,
			isLoading: false
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);

		const link = screen.getByText('View More Park Details').closest('a');
		expect(link).toHaveAttribute('href', `/locations/${mockPark.abbreviation}`);
		expect(link).toHaveClass('inline-block', 'text-blue-600', 'transition-colors', 'hover:text-blue-800', 'hover:underline');
	});

	it('has a working close button', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: mockStamp,
			isLoading: false
		});

		render(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);

		const closeButton = screen.getByRole('button', { name: 'Close park details' });
		closeButton.click();
		expect(mockHandleClose).toHaveBeenCalled();
	});
});
