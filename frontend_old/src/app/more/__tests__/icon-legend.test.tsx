import { IconLegend } from '@/app/more/icon-legend';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('IconLegend Component - User Stories', () => {
    it('matches snapshot', () => {
        const { container } = render(<IconLegend />);
        expect(container).toMatchSnapshot();
    });
});
