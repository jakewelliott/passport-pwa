import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LoadingPlaceholder', () => {
    it('matches snapshot', () => {
        const { container } = render(<LoadingPlaceholder />);
        expect(container).toMatchSnapshot();
    });
});
