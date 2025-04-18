import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SplashScreenView } from '../splash-screen-view';

describe('SplashScreenView', () => {
    it('matches snapshot', () => {
        const { container } = render(<SplashScreenView />);
        expect(container).toMatchSnapshot();
    });
});
