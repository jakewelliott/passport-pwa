import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LocationActionBar } from '../../components/location-action-bar';

describe('LocationActionBar', () => {
    it('should render', () => {
        renderWithClient(<LocationActionBar park={mockPark} />);
        expect(screen.getByTestId('location-action-bar')).toBeInTheDocument();
    });

    it('should contain coordinates link', () => {
        renderWithClient(<LocationActionBar park={mockPark} />);
        expect(screen.getByTestId('location-action-bar').innerHTML).contains(
            `href="https://www.google.com/maps/place/${mockPark.coordinates.latitude},${mockPark.coordinates.longitude}"`,
        );
    });

    it('should contain telephone link', () => {
        renderWithClient(<LocationActionBar park={mockPark} />);
        expect(screen.getByTestId('location-action-bar').innerHTML).contains(`href="tel://${mockPark.phone}"`);
    });

    it('should contain website link', () => {
        renderWithClient(<LocationActionBar park={mockPark} />);
        expect(screen.getByTestId('location-action-bar').innerHTML).contains(`href="${mockPark.website}"`);
    });

    it('should contain email link', () => {
        renderWithClient(<LocationActionBar park={mockPark} />);
        expect(screen.getByTestId('location-action-bar').innerHTML).contains(`href="mailto:${mockPark.email}"`);
    });
});
