import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import DateHelper from '@/lib/date-helper';
import { api } from '@/lib/mock/api';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';
// Mock the hooks
vi.mock('@/hooks/queries/useStamps');
vi.mock('@/hooks/queries/useParks');

const mockUseStamp = useStamp as Mock;
const mockUsePark = usePark as Mock;

describe('StampDetails', () => {
	const mockPark = api.getPark('ENRI');
	const mockStamp = {
		code: 'ENRI',
		timestamp: new Date('2024-01-01T12:00:00Z'),
		location: { latitude: 0, longitude: 0 },
	};
	const mockHandleClose = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockUsePark.mockReturnValue({ data: mockPark });
		mockUseStamp.mockReturnValue({ data: mockStamp });
	});

	it('renders stamp details correctly', () => {
		renderWithClient(<StampDetails abbreviation='ENRI' handleClose={mockHandleClose} />);

		// Verify park name is displayed
		expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();

		// Verify collection date is displayed
		expect(screen.getByText(`Stamp collected on ${DateHelper.stringify(mockStamp.timestamp)}`)).toBeInTheDocument();
	});

	// it('shows loading state when park data is loading', () => {
	// 	mockUsePark.mockReturnValue({ data: null, isLoading: true });

	// 	renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });
});
