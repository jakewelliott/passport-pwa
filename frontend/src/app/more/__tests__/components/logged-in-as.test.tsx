import { useUser } from '@/hooks/queries/useUser';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { LoggedInAs } from '../../components/logged-in-as';

const { render, checkHook } = setupTestEnv();
describe('LoggedInAs', () => {
    beforeAll(async () => {
        await checkHook(useUser, 'useUser');
    });

    it('matches snapshot', () => {
        const { container } = render(<LoggedInAs />);
        expect(container).toMatchSnapshot();
    });

    it('calls logout function when logout button is clicked', () => {
        render(<LoggedInAs />);
        const logoutLink = screen.getByText('Log out');
        fireEvent.click(logoutLink);
        // TODO: find some way to test that the logout function is called
        expect(false).toBe(true);
    });
});
