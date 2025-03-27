import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingPlaceholder } from '../loading-placeholder';

describe('LoadingPlaceholder', () => {
    it('renders with animation class', () => {
        const { container } = render(<LoadingPlaceholder />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });
});
