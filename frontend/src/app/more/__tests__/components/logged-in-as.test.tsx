import { render, screen, fireEvent } from '@testing-library/react';
import { LoggedInAs } from '../../components/logged-in-as';
import { useUser } from "@/hooks/queries/useUser";
import { useLogout } from "@/hooks/auth/useLogout";

// Mock the hooks
jest.mock("@/hooks/queries/useUser");
jest.mock("@/hooks/auth/useLogout");

describe('LoggedInAs', () => {
	// Mock logout function
	const mockLogout = jest.fn();

	beforeEach(() => {
		// Clear all mocks before each test
		jest.clearAllMocks();
		// Setup default mock for useLogout
		(useLogout as Mock).mockReturnValue(mockLogout);
	});

	test('displays logged in message when user exists', () => {
		// Mock useUser to return a user
		(useUser as Mock).mockReturnValue({
			data: { username: 'testUser' }
		});

		render(<LoggedInAs />);

		expect(screen.getByText("You are currently logged in as 'testUser'")).toBeInTheDocument();
		expect(screen.getByText('Log out')).toBeInTheDocument();
	});

	test('displays not logged in message when no user', () => {
		// Mock useUser to return no user
		(useUser as Mock).mockReturnValue({
			data: null
		});

		render(<LoggedInAs />);

		expect(screen.getByText('You are not logged in')).toBeInTheDocument();
		expect(screen.getByText('Log out')).toBeInTheDocument();
	});

	test('calls logout function when logout button is clicked', () => {
		// Mock useUser to return a user
		(useUser as Mock).mockReturnValue({
			data: { username: 'testUser' }
		});

		render(<LoggedInAs />);

		const logoutButton = screen.getByText('Log out');
		fireEvent.click(logoutButton);

		expect(mockLogout).toHaveBeenCalledTimes(1);
	});
});
