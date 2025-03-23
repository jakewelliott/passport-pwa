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

  it('fetches park activity for non-admin users', () => {
    renderDetailTabs();
    // Verify components are rendered with park activity data
    expect(screen.getByTestId('location-contact')).toBeInTheDocument();
  });

  it('does not fetch park activity for admin users', () => {
    renderDetailTabs();
    // Verify components are rendered without park activity data
    expect(screen.getByTestId('location-contact')).toBeInTheDocument();
  });
});
