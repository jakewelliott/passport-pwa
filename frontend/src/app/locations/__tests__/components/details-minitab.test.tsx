import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { mockPark } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();

describe('DetailsMiniTab', () => {
    it('matches snapshot', () => {
        const { container } = render(<DetailsMiniTab park={mockPark} />);
        expect(container).toMatchSnapshot();
    });
});
