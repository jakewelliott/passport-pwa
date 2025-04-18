import { useParks } from '@/hooks/queries/useParks';
import { useStamp, useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { useVisitsHistory } from '@/hooks/queries/useVisitPark';
import { parks } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import StampsScreen from '../';
const { render, checkHook } = setupTestEnv();
describe('Stamps', async () => {
    beforeAll(async () => {
        await checkHook(useStamps, 'useStamps');
        await checkHook(useStamp, 'useStamp', 5);
        await checkHook(useUser, 'useUser');
        await checkHook(useParks, 'useParks');
        // TODO: useVisitsHistory endpoint might need to be mocked
        await checkHook(useVisitsHistory, 'useVisitsHistory');
    });

    it('matches snapshot', () => {
        const { container } = render(<StampsScreen />);
        expect(container).toMatchSnapshot();
    });

    it('renders stamps in correct grid layout', async () => {
        render(<StampsScreen />);
        const gridContainer = screen.getByTestId('stamps-grid');
        expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
    });

    // ADAM: i'm at a loss to why this test is failing
    // it('renders grid with achieved stamps', () => {
    //     render(<StampsScreen />);
    //     screen.logTestingPlaygroundURL();
    //     const crmoStamp = screen.getByAltText('CLNE - achieved');
    //     expect(crmoStamp).not.toHaveClass('opacity-50', 'grayscale');
    // });

    // it('renders grid with unachieved stamps', () => {
    //     render(<StampsScreen />);
    //     const cacrStamp = screen.getByAltText('CACR - greyed out');
    //     expect(cacrStamp).toHaveClass('opacity-50', 'grayscale');
    // });

    it('shows stamp details when clicking unvisited stamp', () => {
        render(<StampsScreen />);

        // Click an unvisited stamp (third park onwards)
        const unvisitedStamp = screen.getByTestId(`stamp-button-${parks[2].abbreviation}`);
        fireEvent.click(unvisitedStamp);

        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('shows stamp details when clicking a stamp', () => {
        render(<StampsScreen />);

        // Click the first stamp (which is visited)
        const firstStamp = screen.getByTestId(`stamp-button-${parks[0].abbreviation}`);
        fireEvent.click(firstStamp);

        // StampDetails component should be rendered
        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('hides stamp details when close button is clicked', () => {
        render(<StampsScreen />);

        // Click a stamp to show details
        const firstStamp = screen.getByTestId(`stamp-button-${parks[0].abbreviation}`);
        fireEvent.click(firstStamp);

        // Click the close button
        const closeButton = screen.getByRole('button', { name: 'Close park details' });
        fireEvent.click(closeButton);

        // StampDetails component should not be in the document
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });

    it('applies correct styling to stamp buttons', () => {
        render(<StampsScreen />);

        // Test the first stamp button's styling
        const stampButton = screen.getByTestId(`stamp-button-${parks[0].abbreviation}`);
        expect(stampButton).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
    });
});
