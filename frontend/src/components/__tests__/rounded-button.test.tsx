import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RoundedButton from '../rounded-button';

describe('RoundedButton', () => {
    it('renders with default props', () => {
        render(<RoundedButton title='Click me' />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
        const buttonDiv = screen.getByText('Click me').parentElement;
        expect(buttonDiv).toHaveClass('bg-secondary_darkteal');
    });

    it('renders with custom color', () => {
        render(<RoundedButton title='Custom Button' color='system_black' />);
        expect(screen.getByText('Custom Button')).toBeInTheDocument();
        const buttonDiv = screen.getByText('Custom Button').parentElement;
        expect(buttonDiv).toHaveClass('bg-system_black');
    });
});
