import { Reservations } from '@/app/more/components/reservations';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();

describe('Reservations', () => {
    it('matches snapshot', () => {
        const { container } = render(<Reservations />);
        expect(container).toMatchSnapshot();
    });
});
