import More from '@/app/more/index';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('More Page', () => {
    it('matches snapshot', () => {
        const { container } = render(<More />);
        expect(container).toMatchSnapshot();
    });
});
