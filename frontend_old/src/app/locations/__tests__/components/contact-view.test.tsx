import { ContactView } from '@/app/locations/components/contact-view';
import { mockPark } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('ContactView', () => {
    it('matches snapshot', () => {
        const { container } = render(<ContactView park={mockPark} />);
        expect(container).toMatchSnapshot();
    });
});
