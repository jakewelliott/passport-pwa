import MyProfile from '@/app/more/my-profile';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('MyProfile Component', () => {
    it('matches snapshot', () => {
        const { container } = render(<MyProfile />);
        expect(container).toMatchSnapshot();
    });
});
