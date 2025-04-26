import { describe, expect, it } from 'vitest';
import { AdminPage } from '../index';

import { setupTestEnv } from '@/lib/testing/test-wrapper';

const { render } = setupTestEnv();

describe('AdminPage', () => {
    it('matches snapshot', () => {
        const { container } = render(<AdminPage />);
        expect(container).toMatchSnapshot();
    });
});
