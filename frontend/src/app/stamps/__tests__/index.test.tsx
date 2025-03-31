import { parks } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import StampsScreen from '../';

const mockParks = parks;

describe('Stamps', async () => {
    beforeEach(async () => {
        renderWithClient(<StampsScreen />);
        await waitFor(() => {
            expect(screen.getByTestId('stamps-grid')).toBeInTheDocument();
        });
    });

    it('renders stamps in correct grid layout', async () => {
        screen.debug();
        const gridContainer = screen.getByTestId('stamps-grid');
        expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
    });

    it('renders grid with achieved stamps', () => {
        const crmoStamp = screen.getByAltText('CRMO - achieved');
        expect(crmoStamp).not.toHaveClass('opacity-50', 'grayscale');
    });

    it('renders grid with unachieved stamps', () => {
        const cacrStamp = screen.getByAltText('CACR - greyed out');
        expect(cacrStamp).toHaveClass('opacity-50', 'grayscale');
    });

    it('shows stamp details when clicking unvisited stamp', () => {
        renderWithClient(<StampsScreen />);

        // Click an unvisited stamp (third park onwards)
        const unvisitedStamp = screen.getByTestId(`stamp-button-${mockParks[2].abbreviation}`);
        fireEvent.click(unvisitedStamp);

        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('shows stamp details when clicking a stamp', () => {
        renderWithClient(<StampsScreen />);

        // Click the first stamp (which is visited)
        const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
        fireEvent.click(firstStamp);

        // StampDetails component should be rendered
        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('hides stamp details when close button is clicked', () => {
        renderWithClient(<StampsScreen />);

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
        renderWithClient(<StampsScreen />);

        // Test the first stamp button's styling
        const stampButton = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
        expect(stampButton).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
    });
});
