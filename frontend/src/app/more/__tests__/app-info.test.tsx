import { AppInfo } from '@/app/more/app-info';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('AppInfo Component - User Stories', () => {
    it('matches snapshot', () => {
        const { container } = render(<AppInfo />);
        expect(container).toMatchSnapshot();
    });
});
