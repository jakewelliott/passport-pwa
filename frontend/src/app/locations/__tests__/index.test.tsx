import { parks } from '@/lib/testing/mock/tables';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Locations from '../index';

describe('Locations', () => {
    // ADAM: this test is failing because its not waiting for the data to be loaded
    // i will figure out how to fix this later
    it('renders all parks in a list', async () => {
        renderWithClient(<Locations />);
        const parkElements = screen.getAllByTestId('park');
        expect(parkElements).toHaveLength(parks.length);
    });
});
