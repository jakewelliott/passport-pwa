import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';

describe('StampDetails', () => {
    const mockHandleClose = vi.fn();

    it('renders stamp details correctly', () => {
        renderWithClient(<StampDetails park={mockPark} handleClose={mockHandleClose} />);
        // Verify park name is displayed
        expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();
        // Verify stamp not yet collected
        expect(screen.getByTestId('stamp-collected-on').textContent).toBe('Stamp not yet collected');
    });
});
