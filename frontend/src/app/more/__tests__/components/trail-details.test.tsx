import { TrailDetailView } from '@/app/more/components/trail-details';
import { mockTrail } from '@/lib/testing/mock';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();

describe('TrailDetailView', () => {
    it('matches snapshot', () => {
        const { container } = render(<TrailDetailView trail={mockTrail} />);
        expect(container).toMatchSnapshot();
    });
});
