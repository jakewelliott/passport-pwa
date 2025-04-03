import StayingSafe from '@/app/more/staying-safe';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('StayingSafe Component', () => {
    it('matches snapshot', () => {
        const { container } = render(<StayingSafe />);
        expect(container).toMatchSnapshot();
    });
});
