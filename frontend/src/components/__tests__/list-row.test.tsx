import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListRow from '../list-row';

describe('ListRow', () => {
    it('matches snapshot', () => {
        const { container } = render(
            <ListRow>
                <div>Test Content</div>
            </ListRow>,
        );
        expect(container).toMatchSnapshot();
    });
});
