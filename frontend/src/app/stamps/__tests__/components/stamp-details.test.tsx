import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import dateHelper from '@/lib/date-helper';
import { collectedStamps, mockPark } from '@/lib/testing/mock/tables';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';

// Mock the hooks
vi.mock('@/hooks/queries/useStamps');
vi.mock('@/hooks/queries/useParks');

const mockStamp = collectedStamps[0];

const mockUseStamp = useStamp as Mock;
const mockUsePark = usePark as Mock;

describe('StampDetails', () => {
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
		expect(
			screen.getByText(`Stamp collected on ${dateHelper.stringify(new Date(mockStamp.created_at)).replace(',', ' at')}`),
		).toBeInTheDocument();
	});

	// it('shows loading state when park data is loading', () => {
	// 	mockUsePark.mockReturnValue({ data: null, isLoading: true });

	// 	renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });
});
