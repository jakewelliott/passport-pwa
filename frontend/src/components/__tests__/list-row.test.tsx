import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListRow from '../list-row';

describe('ListRow', () => {
    it('renders children correctly', () => {
        render(
            <ListRow>
                <div>Test Content</div>
            </ListRow>,
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('has correct styling', () => {
        render(
            <ListRow>
                <div>Content</div>
            </ListRow>,
        );
        const rowDiv = screen.getByText('Content').parentElement;
        expect(rowDiv).toHaveClass('flex', 'items-center', 'bg-supporting_lightblue', 'p-3', 'shadow-md');
        expect(rowDiv).toHaveStyle({
            borderRadius: '15px',
        });
    });

    it('renders multiple children', () => {
        render(
            <ListRow>
                <div>First Child</div>
                <div>Second Child</div>
                <div>Third Child</div>
            </ListRow>,
        );
        expect(screen.getByText('First Child')).toBeInTheDocument();
        expect(screen.getByText('Second Child')).toBeInTheDocument();
        expect(screen.getByText('Third Child')).toBeInTheDocument();
    });
});
