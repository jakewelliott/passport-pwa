import { ContactUs } from '@/app/more/components/contact-us';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('Contact Us', () => {
    it('matches snapshot', () => {
        const { container } = render(<ContactUs />);
        expect(container).toMatchSnapshot();
    });
});
