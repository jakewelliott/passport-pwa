import { HikingEssentials } from '@/app/more/hiking-essentials';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HikingEssentials Component - User Stories', () => {
    it('matches snapshot', () => {
        const { container } = render(<HikingEssentials />);
        expect(container).toMatchSnapshot();
    });
});
