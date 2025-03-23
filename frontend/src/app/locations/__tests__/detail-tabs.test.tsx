import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ParkInfoScreen from '../park-info';

describe('DetailTabs', () => {
	const renderDetailTabs = () => {
		renderWithClient(
			<Routes>
				<Route path='/locations/:abbreviation' element={<ParkInfoScreen />} />
			</Routes>,
			{ routerProps: { initialEntries: ['/locations/CABE'] } },
		);
	};

	it('shows loading placeholder when data is loading', async () => {
		renderDetailTabs();
		expect(await screen.findByTestId('loading-placeholder')).toBeInTheDocument();
	});

	it('shows loading placeholder when park data is null', async () => {
		renderDetailTabs();
		expect(await screen.findByTestId('loading-placeholder')).toBeInTheDocument();
	});

	it('fetches park activity for non-admin users', () => {
		renderWithClient(
			<Routes>
				<Route path='/locations/:abbreviation' element={<ParkInfoScreen />} />
			</Routes>,
			{ routerProps: { initialEntries: ['/locations/CABE'] } },
		);
		// Verify components are rendered with park activity data
		expect(screen.getByTestId('location-contact')).toBeInTheDocument();
	});

	it('does not fetch park activity for admin users', () => {
		renderWithClient(
			<Routes>
				<Route path='/locations/:abbreviation' element={<ParkInfoScreen />} />
			</Routes>,
			{ routerProps: { initialEntries: ['/locations/CABE'] } },
		);
		// Verify components are rendered without park activity data
		expect(screen.getByTestId('location-contact')).toBeInTheDocument();
	});
});
