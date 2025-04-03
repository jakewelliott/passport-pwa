import { AddressView } from '@/app/locations/components/address-view';
import { mockPark } from '@/lib/testing/mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const testPark = {
    ...mockPark,
    addresses: [...mockPark.addresses, mockPark.addresses[0], mockPark.addresses[1]],
};

describe('AddressView', () => {
    it('matches snapshot', () => {
        const { container } = render(<AddressView park={testPark} />);
        expect(container).toMatchSnapshot();
    });

    it('renders show more button', () => {
        render(<AddressView park={testPark} />);
        expect(screen.getByText('Show More')).toBeInTheDocument();
    });

    it('renders show less button', () => {
        render(<AddressView park={testPark} />);
        const button = screen.getByText('Show More');
        fireEvent.click(button);
        expect(screen.getByText('Show Less')).toBeInTheDocument();
    });
});
