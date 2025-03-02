import { usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import dateHelper from '@/lib/date-helper';
import { renderWithClient } from '@/lib/test-wrapper';
import type { Address, CollectedStamp, Park } from '@/types';
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
	const mockAddress: Address = {
		title: '',
		addressLineOne: '',
		addressLineTwo: '',
		city: '',
		state: '',
		zipcode: 0,
	};

	const mockPark: Park = {
		id: 1,
		parkName: 'ENRI',
		coordinates: { latitude: 0, longitude: 0, accuracy: 0 },
		phone: 0,
		email: '',
		establishedYear: '',
		landmark: '',
		youCanFind: '',
		trails: '',
		website: '',
		addresses: [mockAddress],
		icons: [],
		bucketListItems: [],
		photos: [],
		abbreviation: '',
	};

	const mockStamp: CollectedStamp = {
		parkAbbreviation: 'ENRI',
		createdAt: new Date('2024-01-01T12:00:00.000Z'),
		method: 'manual',
		id: 0,
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
		expect(
			screen.getByText(`Stamp collected on ${dateHelper.stringify(mockStamp.createdAt).replace(',', ' at')}`),
		).toBeInTheDocument();
	});

	// it('shows loading state when park data is loading', () => {
	// 	mockUsePark.mockReturnValue({ data: null, isLoading: true });

	// 	renderWithClient(<StampDetails abbreviation="ENRI" handleClose={mockHandleClose} />);

	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });
});
