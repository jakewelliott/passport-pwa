import { TrailMap } from '@/app/more/components/trail-map';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('TrailMap', () => {
    it('matches snapshot', () => {
        const { container } = render(<TrailMap />);
        expect(container).toMatchSnapshot();
    });
});
