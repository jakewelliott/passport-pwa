import { screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import LoginPage from '../login';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the react-toastify
jest.mock('react-toastify');

// Mock the auth hooks
jest.mock('@/hooks/useAuth', () => ({
	useLogin: () => ({
		mutate: jest.fn((data, { onSuccess, onError }) => {
			if (data.username === 'testuser' && data.password === 'password') {
				onSuccess();
			} else {
				onError(new Error('Invalid credentials'));
			}
		}),
	}),
	useRegister: () => ({
		mutate: jest.fn((data, { onSuccess, onError }) => {
			if (data.username === 'newuser' && data.password === 'password') {
				onSuccess();
			} else {
				onError(new Error('Username already exists'));
			}
		}),
	}),
}));

const renderLoginPage = () => {
	renderWithClient(<LoginPage />);
};

describe('LoginPage', () => {
	beforeEach(() => {
		jest.clearAllMocks();
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

	it('handles successful login', async () => {
		renderLoginPage();

		fireEvent.change(screen.getByPlaceholderText('Username'), {
			target: { value: 'testuser' },
		});
		fireEvent.change(screen.getByPlaceholderText('Password'), {
			target: { value: 'password' },
		});

		fireEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith('Successfully logged in as testuser');
		});
	});

	it('handles failed login', async () => {
		renderLoginPage();

		fireEvent.change(screen.getByPlaceholderText('Username'), {
			target: { value: 'wronguser' },
		});
		fireEvent.change(screen.getByPlaceholderText('Password'), {
			target: { value: 'wrongpass' },
		});

		fireEvent.click(screen.getByText('Login'));

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
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

		fireEvent.click(screen.getByText('Register'));

		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith('Successfully registered as newuser');
		});
	});

	it('handles failed registration', async () => {
		renderLoginPage();

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
	});

	it('renders privacy policy link', () => {
		renderLoginPage();

		const privacyLink = screen.getByText('Privacy Policy');
		expect(privacyLink).toBeInTheDocument();
		expect(privacyLink).toHaveAttribute('href', 'https://www.nc.gov/privacy');
		expect(privacyLink).toHaveAttribute('target', '_blank');
	});
});
