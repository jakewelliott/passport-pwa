import { screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import LoginPage from '../login';
import { renderWithClient } from '@/lib/test-wrapper';
import { act } from 'react-dom/test-utils';

// Mock the react-toastify
jest.mock('react-toastify');

// Mock the auth hooks
const loginMutate = jest.fn();
const registerMutate = jest.fn();

jest.mock('@/hooks/auth/useLogin', () => ({
	useLogin: () => ({
		mutate: loginMutate,
	}),
}));

jest.mock('@/hooks/auth/useRegister', () => ({
	useRegister: () => ({
		mutate: registerMutate,
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

		await act(async () => {
			fireEvent.click(screen.getByText('Login'));
		});

		expect(loginMutate).toHaveBeenCalledWith(
			{ username: 'testuser', password: 'password' },
			expect.objectContaining({
				onError: expect.any(Function),
			})
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
			errorCallback!(new Error('Invalid credentials'));
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
			})
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
			errorCallback!(new Error('Username already exists'));
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

	// Add these tests to your existing test suite

it('renders SuperAdminButton component', () => {
	renderLoginPage();
	expect(screen.getByTestId('super-admin-button')).toBeInTheDocument();
  });
  
  it('applies correct styles to input fields based on error state', async () => {
	renderLoginPage();
  
	const usernameInput = screen.getByPlaceholderText('Username');
	const passwordInput = screen.getByPlaceholderText('Password');
  
	// Initially, inputs should have default styles
	expect(usernameInput).not.toHaveClass('border-system_red');
	expect(passwordInput).not.toHaveClass('border-system_red');
  
	// Trigger validation error
	fireEvent.click(screen.getByText('Login'));
  
	await waitFor(() => {
	  expect(usernameInput).toHaveClass('border-system_red');
	  expect(passwordInput).toHaveClass('border-system_red');
	});
  
	// Fill in fields and check if error styles are removed
	fireEvent.change(usernameInput, { target: { value: 'testuser' } });
	fireEvent.change(passwordInput, { target: { value: 'password' } });
  
	fireEvent.click(screen.getByText('Login'));
  
	await waitFor(() => {
	  expect(usernameInput).not.toHaveClass('border-system_red');
	  expect(passwordInput).not.toHaveClass('border-system_red');
	});
  });
  
  it('handles partial form completion', async () => {
	renderLoginPage();
  
	fireEvent.change(screen.getByPlaceholderText('Username'), {
	  target: { value: 'testuser' },
	});
  
	fireEvent.click(screen.getByText('Login'));
  
	await waitFor(() => {
	  expect(toast.error).toHaveBeenCalledWith('Password is required.');
	});
  });
  
  it('clears error states on successful login/register', async () => {
	renderLoginPage();
  
	// Trigger error state
	fireEvent.click(screen.getByText('Login'));
  
	await waitFor(() => {
	  expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
	  expect(screen.getByPlaceholderText('Password')).toHaveClass('border-system_red');
	});
  
	// Fill form and submit
	fireEvent.change(screen.getByPlaceholderText('Username'), {
	  target: { value: 'testuser' },
	});
	fireEvent.change(screen.getByPlaceholderText('Password'), {
	  target: { value: 'password' },
	});
  
	await act(async () => {
	  fireEvent.click(screen.getByText('Login'));
	});
  
	// Check if error states are cleared
	expect(screen.getByPlaceholderText('Username')).not.toHaveClass('border-system_red');
	expect(screen.getByPlaceholderText('Password')).not.toHaveClass('border-system_red');
  });
  
  it('handles form submission with only username filled', async () => {
	renderLoginPage();
  
	fireEvent.change(screen.getByPlaceholderText('Password'), {
	  target: { value: 'testuser' },
	});
  
	fireEvent.click(screen.getByText('Login'));
  
	await waitFor(() => {
	  expect(toast.error).toHaveBeenCalledWith('Username is required.');
	});
  
	expect(screen.getByPlaceholderText('Username')).toHaveClass('border-system_red');
	expect(screen.getByPlaceholderText('Password')).not.toHaveClass('border-system_red');
  });
  
});
