import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminPage } from '../index';

describe('AdminPage', () => {
    it('renders the welcome message', () => {
        render(<AdminPage />);
        const welcomeMessage = screen.getByText('Welcome to the Admin Page!!');
        expect(welcomeMessage).toBeInTheDocument();
    });

    it('renders a div element', () => {
        render(<AdminPage />);
        const divElement = screen.getByText('Welcome to the Admin Page!!');
        expect(divElement.tagName).toBe('DIV');
    });

    it('renders only one element', () => {
        const { container } = render(<AdminPage />);
        expect(container.childElementCount).toBe(1);
    });
});
