import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PassportHeader } from '../passport-header';

describe('PassportHeader', () => {
    it('matches snapshot', () => {
        const { container } = render(<PassportHeader />);
        expect(container).toMatchSnapshot();
    });
});
