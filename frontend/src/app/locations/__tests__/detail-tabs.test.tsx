import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import DetailTabs from '../detail-tabs';
import { usePark } from '@/hooks/queries/useParks';
import { api } from '@/lib/mock/api';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the hooks
jest.mock('@/hooks/queries/useParks');

const mockUsePark = usePark as jest.Mock;

describe('DetailTabs', () => {
	const mockPark = api.getPark('ENRI');

	beforeEach(() => {
		jest.clearAllMocks();
		mockUsePark.mockReturnValue({ data: mockPark });
	});

	const renderDetailTabs = () => {
		renderWithClient(
			<Routes>
				<Route path="/locations/:abbreviation" element={<DetailTabs />} />
			</Routes>,
			{ routerProps: { initialEntries: ['/locations/ENRI'] } }
		);
	};

	// it('shows loading placeholder when data is loading', () => {
	// 	mockUsePark.mockReturnValue({
	// 		data: null,
	// 		isLoading: true
	// 	});

	// 	renderDetailTabs();
	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });

	// it('shows loading placeholder when park data is null', () => {
	// 	mockUsePark.mockReturnValue({
	// 		data: null,
	// 		isLoading: false
	// 	});

	// 	renderDetailTabs();
	// 	expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
	// });

	it('renders all components when park data is available', () => {
		mockUsePark.mockReturnValue({
			data: mockPark,
			isLoading: false
		});

		renderDetailTabs();

		// Check if LocationContact is rendered
		expect(screen.getByTestId('location-contact')).toBeInTheDocument();

		// Check if LocationActionBar is rendered
		expect(screen.getByTestId('location-action-bar')).toBeInTheDocument();

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

		renderDetailTabs();

		// Verify park data is passed correctly by checking rendered content
		expect(screen.getByText(mockPark.name)).toBeInTheDocument();
		if (mockPark.address[0].city) {
			expect(screen.getByText(new RegExp(mockPark.address[0].city))).toBeInTheDocument();
		}
	});
});
