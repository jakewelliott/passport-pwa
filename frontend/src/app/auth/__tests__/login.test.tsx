import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { describe, expect, it } from 'vitest';
import LoginPage from '../login';

const { render, checkHook } = setupTestEnv();
describe('LoginPage', () => {
    it('matches snapshot', () => {
        const { container } = render(<LoginPage />);
        expect(container).toMatchSnapshot();
    });

    it('shows username and password error', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByText('Login');

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Username and Password are required.');
        });
    });

    it('shows empty password error', async () => {
        render(<LoginPage />);
        const usernameField = screen.getByPlaceholderText('Username');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameField, {
            target: { value: 'username' },
        });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Password is required.');
        });
    });

    it('shows empty username error', async () => {
        render(<LoginPage />);
        const passwordField = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(passwordField, {
            target: { value: 'password' },
        });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Username is required.');
        });
    });

    it('handles successful login', async () => {
        render(<LoginPage />);
        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameField, {
            target: { value: 'testuser' },
        });
        fireEvent.change(passwordField, {
            target: { value: 'password' },
        });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Welcome back, testuser');
        });
    });

    it('handles failed login', async () => {
        render(<LoginPage />);
        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameField, {
            target: { value: 'wronguser' },
        });
        fireEvent.change(passwordField, {
            target: { value: 'wrongpass' },
        });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
            expect(screen.getByPlaceholderText('Username')).toHaveClass('ring-system_red');
        });
    });

    it('handles successful registration', async () => {
        render(<LoginPage />);
        const usernameField = screen.getByPlaceholderText('Username');
        const passwordField = screen.getByPlaceholderText('Password');
        const registerButton = screen.getByText('Register');

        fireEvent.change(usernameField, {
            target: { value: 'newuser' },
        });
        fireEvent.change(passwordField, {
            target: { value: 'password' },
        });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Successfully registered as newuser');
        });
    });

    it('handles failed registration', async () => {
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'existinguser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Username already exists');
        });

        expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
        expect(screen.getByPlaceholderText('Username')).toHaveClass('focus:border-system_red');
        expect(screen.getByPlaceholderText('Username')).toHaveClass('ring-system_red');
    });
});
