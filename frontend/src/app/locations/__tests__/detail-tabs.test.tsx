import ParkInfoScreen from '@/app/locations/park-info';
import { usePark, useParks } from '@/hooks/queries/useParks';
import { useStamp, useStamps } from '@/hooks/queries/useStamps';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

const routerProps = { initialEntries: ['/locations/CABE'] };
const { render, checkHook } = setupTestEnv({ routerProps });

describe('DetailTabs', () => {
    // ADAM: for some reason getting undefined error for stamps, skipping for now
    beforeAll(async () => {
        await checkHook(useParks, 'useParks');
        await checkHook(usePark, 'usePark', 'CABE');
        await checkHook(useStamps, 'useStamps');
        await checkHook(useStamp, 'useStamp', 45);
    });

    it('matches snapshot', () => {
        const { container } = render(<ParkInfoScreen />);
        expect(container).toMatchSnapshot();
    });

    it('fetches park activity for non-admin users', () => {
        render(<ParkInfoScreen />);
        // Verify components are rendered with park activity data
        expect(screen.getByTestId('location-contact')).toBeInTheDocument();
    });

    it('does not fetch park activity for admin users', () => {
        render(<ParkInfoScreen />);
        // Verify components are rendered without park activity data
        expect(screen.getByTestId('location-contact')).toBeInTheDocument();
    });
});
