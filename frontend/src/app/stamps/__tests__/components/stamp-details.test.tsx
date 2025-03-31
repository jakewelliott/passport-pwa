import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';

describe('StampDetails', () => {
    const mockHandleClose = vi.fn();

    beforeEach(async () => {
        renderWithClient(<StampDetails park={mockPark} handleClose={mockHandleClose} />);
        await waitFor(() => {
            expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();
        });
        screen.debug();
    });

    it('renders stamp details correctly', () => {
        // Park name is displayed
        expect(screen.getByRole('heading', { name: mockPark.parkName })).toBeInTheDocument();
        // Stamp image is displayed
        expect(screen.getByAltText(`${mockPark.abbreviation} stamp`)).toBeInTheDocument();
        // Stamp not yet collected
        expect(screen.getByText('Stamp not yet collected')).toBeInTheDocument();
    });
});
