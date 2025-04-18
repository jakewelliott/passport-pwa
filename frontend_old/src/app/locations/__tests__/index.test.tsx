import { useParks } from '@/hooks/queries/useParks';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { beforeAll, describe, expect, it } from 'vitest';
import Locations from '../index';

const { render, checkHook } = setupTestEnv();

describe('Locations', () => {
    beforeAll(async () => {
        await checkHook(useParks, 'useParks');
    });

    it('matches snapshot', async () => {
        const { container } = render(<Locations />);
        expect(container).toMatchSnapshot();
    });

    // ADAM: add tests for filter buttons, definitely in another file tho
});
