import { screen, fireEvent } from '@testing-library/react';
import Stamps from '../index';
import { useParks, usePark } from '@/hooks/queries/useParks';
import { useStamp } from '@/hooks/queries/useStamps';
import { api } from '@/lib/mock/api';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');
jest.mock('@/hooks/useStamps');

const mockUseParks = useParks as jest.Mock;
const mockUsePark = usePark as jest.Mock;
const mockUseStamp = useStamp as jest.Mock;

describe('Stamps', () => {
	const mockParks = api.getParks();

	beforeEach(() => {
		jest.clearAllMocks();
		// Mock usePark to return the first park when called
		mockUsePark.mockReturnValue({
			data: mockParks[0],
			isLoading: false
		});
		// Mock useStamp to return a stamp
		mockUseStamp.mockReturnValue({
			data: { timestamp: new Date(), location: null },
			isLoading: false
		});
	});

	const renderStamps = () => {
		renderWithClient(<Stamps />);
	};

	it('shows loading state when data is loading', () => {
		mockUseParks.mockReturnValue({
			data: null,
			isLoading: true
		});

		renderStamps();
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders grid of stamps when data is available', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderStamps();

		// Check if all park stamps are rendered
		mockParks.forEach(park => {
			const stampImage = screen.getByAltText(`${park.abbreviation} - greyed out`);
			expect(stampImage).toBeInTheDocument();
			expect(stampImage).toHaveAttribute('src', `/stamps/${park.abbreviation}.svg`);
			expect(stampImage).toHaveClass('opacity-50', 'grayscale');
		});
	});

	it('shows stamp details when a stamp is clicked', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderStamps();

		// Click the first stamp
		const firstStamp = screen.getByAltText(`${mockParks[0].abbreviation} - greyed out`);
		fireEvent.click(firstStamp);

		// StampDetails component should be rendered
		expect(screen.getByRole('article')).toBeInTheDocument();
	});

	it('hides stamp details when close button is clicked', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderStamps();

		// Click the first stamp to show details
		const firstStamp = screen.getByAltText(`${mockParks[0].abbreviation} - greyed out`);
		fireEvent.click(firstStamp);

		// Click the close button
		const closeButton = screen.getByRole('button', { name: 'Close park details' });
		fireEvent.click(closeButton);

		// StampDetails component should not be in the document
		expect(screen.queryByRole('article')).not.toBeInTheDocument();
	});

	it('applies correct styling to stamp buttons', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderStamps();

		const stampButtons = screen.getAllByRole('button').filter(button =>
			button.className.includes('flex items-center justify-center p-2')
		);

		stampButtons.forEach(button => {
			expect(button).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
		});
	});

	it('renders stamps in correct grid layout with responsive classes', () => {
		mockUseParks.mockReturnValue({
			data: mockParks,
			isLoading: false
		});

		renderStamps();

		const gridRow = screen.getAllByRole('button')[0].closest('.grid-cols-3');
		expect(gridRow).toHaveClass(
			'grid-cols-3',
			'sm:grid-cols-5',
			'md:grid-cols-6',
			'lg:grid-cols-8'
		);
	});
});
