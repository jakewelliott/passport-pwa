import { useParks } from '@/hooks/queries/useParks';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import Locations from '../index';

// Mock the hooks
vi.mock('@/hooks/queries/useParks');

const mockUseParks = useParks as Mock;

describe('Locations', () => {
	// it('shows loading state when data is loading', () => {
	// 	mockUseParks.mockReturnValue({
	// 		data: null,
	// 		isLoading: true
	// 	});

	// 	renderWithClient(<Locations />);
	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders list of parks when data is available', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false,
		});

		renderWithClient(<Locations />);

		const parkElements = screen.getAllByText(mockParks[0].parkName);
		expect(parkElements).toHaveLength(mockParks.length);
	});
});
