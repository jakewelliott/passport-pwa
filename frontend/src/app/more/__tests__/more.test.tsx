// TODO: fix - jose module configuration issue in Jest
import More from '@/app/more';
import { useUser } from '@/hooks/queries/useUser';
import { useLogout } from '@/hooks/auth/useLogout';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Mock } from 'vitest';
import { renderWithClient } from '@/lib/test-wrapper';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the hooks
vi.mock('@/hooks/queries/useUser');
vi.mock('@/hooks/auth/useLogout');

const mockUseUser = useUser as Mock;
const mockUseLogout = useLogout as Mock;
const mockMutate = vi.fn();

describe('More Page - User Stories', () => {

	beforeEach(() => {
		mockUseUser.mockReturnValue({
			data: { username: 'testuser' }
		});
		mockUseLogout.mockReturnValue({
			mutate: mockMutate,
			isPending: false,
			isSuccess: false,
			isError: false,
			error: null
		});
	});

	// User Story: As a user, I want to see all available sections in the More menu
	it('should display all navigation options for the user', () => {
		renderWithClient(<More />);

		const sections = [
			'Trails',
			'Bucket List',
			'My Notes',
			'Welcome Message',
			'Staying Safe',
			'Hiking Essentials',
			'Icon Legend',
			'App Info'
		];

		for (const section of sections) {
			expect(screen.getByText(section)).toBeInTheDocument();
		}
	});

	// User Story: As a user, I want to see my username displayed
	it('should display the logged-in username', () => {
		render(
			<BrowserRouter>
				<More />
			</BrowserRouter>
		);

		expect(screen.getByText(/testuser/)).toBeInTheDocument();
	});

	// User Story: As a user, I want to be able to log out
	it('should allow the user to log out', () => {
		render(
			<BrowserRouter>
				<More />
			</BrowserRouter>
		);

		const logoutButton = screen.getByText('Log out');
		fireEvent.click(logoutButton);
		expect(mockMutate).toHaveBeenCalled();
	});

	// User Story: As a user, I want all navigation links to be accessible
	it('should have accessible navigation links', () => {
		render(
			<BrowserRouter>
				<More />
			</BrowserRouter>
		);

		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(8); // All section links

		const expectedPaths = [
			'/more/trails',
			'/more/bucket-list',
			'/more/my-notes',
			'/more/welcome-message',
			'/more/staying-safe',
			'/more/hiking-essentials',
			'/more/icon-legend',
			'/more/app-info'
		];

		for (const [index, link] of links.entries()) {
			expect(link).toHaveAttribute('href', expectedPaths[index]);
		}
	});

}); 