import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { usePark } from '@/hooks/queries/useParks';
import { mockPark } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

const { render, wrapper } = setupTestEnv();

describe('DetailsMiniTab', () => {
    beforeAll(() => {
        renderHook(() => usePark(mockPark.abbreviation), { wrapper });
    });

    it('matches snapshot', () => {
        const { container } = render(<DetailsMiniTab park={mockPark} />);
        // wait for the h
        expect(container).toMatchSnapshot();
    });
});
