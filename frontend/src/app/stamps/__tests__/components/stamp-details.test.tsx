import dateHelper from '@/lib/date-helper';
import { mockPark, mockStamp } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';

describe('StampDetails', () => {
	const mockHandleClose = vi.fn();

	it('renders stamp details correctly', () => {
		renderWithClient(<StampDetails abbreviation={mockPark.abbreviation} handleClose={mockHandleClose} />);

		// Verify park name is displayed
		expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();

		// Verify collection date is displayed
		expect(
			screen.getByText(
				`Stamp collected on ${dateHelper.stringify(new Date(mockStamp.createdAt)).replace(',', ' at')}`,
			),
		).toBeInTheDocument();
	});

	// it('shows loading state when park data is loading', () => {
	// 	mockUsePark.mockReturnValue({ data: null, isLoading: true });

	// 	renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });
});
