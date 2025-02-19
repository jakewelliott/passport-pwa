import { screen, fireEvent } from '@testing-library/react';
import { useParks, usePark } from '@/hooks/queries/useParks';
import { useStamps, useStamp } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { api } from '@/lib/mock/api';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Mock } from 'vitest';
import { toast } from 'react-toastify';
import Stamps from '..';
import { renderWithClient } from '@/lib/test-wrapper';
import type { Stamp, Park } from '@/lib/mock/types';

// Mock the hooks and toast
vi.mock('@/hooks/queries/useParks');
vi.mock('@/hooks/queries/useStamps');
vi.mock('@/hooks/queries/useUser');
vi.mock('react-toastify');

const mockUseParks = useParks as Mock;
const mockUseStamps = useStamps as Mock;
const mockUseStamp = useStamp as Mock;
const mockUsePark = usePark as Mock;
const mockUseUser = useUser as Mock;
const mockToast = vi.fn();

describe('Stamps', () => {
	const mockParks = api.getParks();
	const mockStamps: Stamp[] = [
		{
			code: mockParks[0].abbreviation,
			timestamp: new Date(),
			location: {
				latitude: 35.7796,
				longitude: -78.6382
			}
		},
		{
			code: mockParks[1].abbreviation,
			timestamp: new Date(),
			location: {
				latitude: 35.7796,
				longitude: -78.6382
			}
		}
	];

	beforeEach(() => {
		vi.clearAllMocks();
		// Setup default mock returns
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});
		mockUseStamps.mockReturnValue({
			data: mockStamps,
			isLoading: false
		});
		mockUseUser.mockReturnValue({
			isLoading: false
		});
		mockUseStamp.mockReturnValue({
			data: mockStamps[0],
			isLoading: false
		});
		mockUsePark.mockReturnValue({
			data: mockParks[0],
			isLoading: false
		});
		(toast.info as Mock) = mockToast;
	});

	const renderStamps = () => {
		renderWithClient(<Stamps />);
	};

	it('shows nothing when data is loading', () => {
		mockUseParks.mockReturnValue({
			data: null,
			isLoading: true
		});
		mockUseStamps.mockReturnValue({
			data: null,
			isLoading: true
		});
		mockUseUser.mockReturnValue({
			isLoading: true
		});

		renderStamps();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('renders stamps in correct grid layout', () => {
		renderStamps();

		const gridContainer = screen.getByTestId('stamps-grid');
		expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
	});

	it('renders grid of stamps with achieved stamps first', () => {
		renderStamps();

		// Get all stamp images
		const firstStampImage = screen.getByTestId(`stamp-image-${mockParks[0].abbreviation}`);
		const secondStampImage = screen.getByTestId(`stamp-image-${mockParks[1].abbreviation}`);

		// First stamps should be achieved (not greyed out)
		expect(firstStampImage).not.toHaveClass('opacity-50', 'grayscale');
		expect(secondStampImage).not.toHaveClass('opacity-50', 'grayscale');

		// Get an unachieved stamp (any after the first two)
		const unachievedStamp = screen.getByTestId(`stamp-image-${mockParks[2].abbreviation}`);
		expect(unachievedStamp).toHaveClass('opacity-50', 'grayscale');
	});

	it('shows toast message when clicking unvisited stamp', () => {
		renderStamps();

		// Click an unvisited stamp (third park onwards)
		const unvisitedStamp = screen.getByTestId(`stamp-button-${mockParks[2].abbreviation}`);
		fireEvent.click(unvisitedStamp);

		expect(mockToast).toHaveBeenCalled();
		expect(mockToast.mock.calls[0][0]).toContain("You haven't collected");
	});

	it('shows stamp details when clicking a stamp', () => {
		renderStamps();

		// Click the first stamp (which is visited)
		const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
		fireEvent.click(firstStamp);

		// StampDetails component should be rendered
		expect(screen.getByRole('article')).toBeInTheDocument();
	});

	it('hides stamp details when close button is clicked', () => {
		renderStamps();

		// Click a stamp to show details
		const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
		fireEvent.click(firstStamp);

		// Click the close button
		const closeButton = screen.getByRole('button', { name: 'Close park details' });
		fireEvent.click(closeButton);

		// StampDetails component should not be in the document
		expect(screen.queryByRole('article')).not.toBeInTheDocument();
	});

	it('applies correct styling to stamp buttons', () => {
		renderStamps();

		// Test the first stamp button's styling
		const stampButton = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
		expect(stampButton).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
	});
});
