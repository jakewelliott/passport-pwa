import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailTabs from '../detail-tabs';
import { usePark } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUsePark = usePark as jest.Mock;

describe('DetailTabs', () => {
	const mockPark = api.getParks()[0];

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();
	});

	const renderWithRouter = () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<DetailTabs />} />
				</Routes>
			</BrowserRouter>
		);
	};

	it('shows loading placeholder when data is loading', () => {
		mockUsePark.mockReturnValue({
			data: null,
			isLoading: true
		});

		renderWithRouter();
		expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	});

	it('shows loading placeholder when park data is null', () => {
		mockUsePark.mockReturnValue({
			data: null,
			isLoading: false
		});

		renderWithRouter();
		expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	});

	it('renders all components when park data is available', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});

		renderWithRouter();

		// Check if LocationContact is rendered
		expect(screen.getByTestId('location-contact')).toBeInTheDocument();

		// Check if LocationActionBar is rendered
		expect(screen.getByTestId('action-bar')).toBeInTheDocument();

		// Check if LocationMiniTabBar and its children are rendered
		expect(screen.getByText('Details')).toBeInTheDocument();
		expect(screen.getByText('Photos')).toBeInTheDocument();
		expect(screen.getByText('Notes')).toBeInTheDocument();

		// Verify the default tab content is visible (Details tab)
		if (mockPark.established) {
			expect(screen.getByText('Established:')).toBeInTheDocument();
		}
	});

	it('passes correct park data to child components', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});

		renderWithRouter();

		// Verify park data is passed correctly by checking rendered content
		expect(screen.getByText(mockPark.name)).toBeInTheDocument();
		if (mockPark.address[0].city) {
			expect(screen.getByText(new RegExp(mockPark.address[0].city))).toBeInTheDocument();
		}
	});
});
