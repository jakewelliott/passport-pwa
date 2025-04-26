import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RoundedButton from '../rounded-button';

describe('RoundedButton', () => {
    it('matches snapshot', () => {
        const { container } = render(<RoundedButton title='Test' />);
        expect(container).toMatchSnapshot();
    });
});
