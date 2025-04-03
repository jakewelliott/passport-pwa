import { Trails } from '@/app/more/trails';
import { useTrails } from '@/hooks/queries/useTrails';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { beforeAll, describe, expect, it } from 'vitest';

const { render, checkHook } = setupTestEnv();

describe('Trails Component - User Stories', () => {
    beforeAll(() => {
        checkHook(useTrails, 'useTrails');
    });

    it('matches snapshot', () => {
        const { container } = render(<Trails />);
        expect(container).toMatchSnapshot();
    });
});
