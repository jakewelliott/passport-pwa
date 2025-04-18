import { mockPark } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';
import { LocationActionBar } from '../../components/location-action-bar';

const { render } = setupTestEnv();
describe('LocationActionBar', () => {
    it('matches snapshot', () => {
        const { container } = render(<LocationActionBar park={mockPark} />);
        expect(container).toMatchSnapshot();
    });
});
