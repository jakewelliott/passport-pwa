import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';
import { LoggedInAs } from '../../components/logged-in-as';

describe('LoggedInAs', () => {
  it('displays logged in message when user exists', () => {
    renderWithClient(<LoggedInAs />);
    expect(screen.getByText("You are currently logged in as 'testUser'")).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('displays not logged in message when no user', () => {
    renderWithClient(<LoggedInAs />);
    expect(screen.getByText('You are not logged in')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    renderWithClient(<LoggedInAs />);
    const logoutLink = screen.getByText('Log out');
    fireEvent.click(logoutLink);
  });
});
