import { useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { mockPark, parks } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import type { Park } from '@/types/tables';
import { screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { StampDetails } from '../../components/stamp-details';

const uncollected = mockPark;
const collected = parks.find((park) => park.id === 6) as Park;

const mockHandleClose = vi.fn();
const { render, checkHook } = setupTestEnv();

// ADAM: interestingly I don't have to give useStamp a parkId, it just works
// i changed it to useStamps and the 2nd one still works
// so that's a hint to why the note related ones might not be working
describe('StampDetails', () => {
    beforeAll(() => {
        checkHook(useStamps, 'useStamps');
        checkHook(useUser, 'useUser');
    });

    it('matches uncollected stamp snapshot', () => {
        const { container } = render(<StampDetails park={uncollected} handleClose={mockHandleClose} />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Stamp not yet collected')).toBeInTheDocument();
    });

    // TODO: figure out why this is failing
    // it('matches collected stamp snapshot', () => {
    //     const { container } = render(<StampDetails park={collected} handleClose={mockHandleClose} />);
    //     expect(container).toMatchSnapshot();
    //     expect(screen.getByText('Stamp not yet collected')).not.toBeInTheDocument();
    // });
});
