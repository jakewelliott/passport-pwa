import WelcomeMessage from '@/app/more/welcome-message';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WelcomeMessage Component', () => {
    it('matches snapshot', () => {
        const { container } = render(<WelcomeMessage />);
        expect(container).toMatchSnapshot();
    });
});
