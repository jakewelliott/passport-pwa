import { useLogout } from '@/hooks/auth/useLogout';
import { useUser } from '@/hooks/queries/useUser';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import { LoggedInAs } from '../../components/logged-in-as';

// Mock the hooks
vi.mock('@/hooks/queries/useUser');
vi.mock('@/hooks/auth/useLogout');

describe('LoggedInAs', () => {
  // Mock logout function
  const mockLogout = vi.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Setup default mock for useLogout
    (useLogout as Mock).mockReturnValue(mockLogout);
  });

  it('displays logged in message when user exists', () => {
    // Mock useUser to return a user
    (useUser as Mock).mockReturnValue({
      data: { username: 'testUser' },
    });

    render(<LoggedInAs />);

    expect(screen.getByText("You are currently logged in as 'testUser'")).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('displays not logged in message when no user', () => {
    // Mock useUser to return no user
    (useUser as Mock).mockReturnValue({
      data: null,
    });

    render(<LoggedInAs />);

    expect(screen.getByText('You are not logged in')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    // Mock useUser to return a user
    (useUser as Mock).mockReturnValue({
      data: { username: 'testUser' },
    });

    render(<LoggedInAs />);

    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
