import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LoginPage from '../login';

// Mock the react-toastify
vi.mock('react-toastify');

// Mock the auth hooks
const loginMutate = vi.fn();
const registerMutate = vi.fn();

vi.mock('@/hooks/auth/useLogin', () => ({
    useLogin: () => ({
        mutate: loginMutate,
    }),
}));

vi.mock('@/hooks/auth/useRegister', () => ({
    useRegister: () => ({
        mutate: registerMutate,
    }),
}));

const renderLoginPage = () => {
    renderWithClient(<LoginPage />);
};

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form with all elements', () => {
        renderLoginPage();

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        renderLoginPage();

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Username and Password are required.');
        });
    });

    it('shows validation errors when submitting empty field', async () => {
        renderLoginPage();
        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'username' },
        });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Password is required.');
        });

        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });
        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Username is required.');
        });
    });

    it('handles successful login', async () => {
        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Login'));
        });

        expect(loginMutate).toHaveBeenCalledWith(
            { username: 'testuser', password: 'password' },
            expect.objectContaining({
                onError: expect.any(Function),
            }),
        );
    });

    it('handles failed login', async () => {
        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'wronguser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'wrongpass' },
        });

        let errorCallback: (error: Error) => void;
        loginMutate.mockImplementation((_, options) => {
            errorCallback = options.onError;
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Login'));
            errorCallback?.(new Error('Invalid credentials'));
        });

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
            expect(screen.getByPlaceholderText('Username')).toHaveClass('ring-system_red');
        });
    });

    it('handles successful registration', async () => {
        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'newuser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Register'));
        });

        expect(registerMutate).toHaveBeenCalledWith(
            { username: 'newuser', password: 'password' },
            expect.objectContaining({
                onError: expect.any(Function),
            }),
        );
    });

    it('handles failed registration', async () => {
        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'existinguser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        let errorCallback: (error: Error) => void;
        registerMutate.mockImplementation((_, options) => {
            errorCallback = options.onError;
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Register'));
            errorCallback?.(new Error('Username already exists'));
        });

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
            expect(screen.getByPlaceholderText('Username')).toHaveClass('focus:border-system_red');
            expect(screen.getByPlaceholderText('Username')).toHaveClass('ring-system_red');
        });
    });

    it('renders privacy policy link', () => {
        renderLoginPage();

        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink).toBeInTheDocument();
        expect(privacyLink).toHaveAttribute('href', 'https://www.nc.gov/privacy');
        expect(privacyLink).toHaveAttribute('target', '_blank');
    });
});
