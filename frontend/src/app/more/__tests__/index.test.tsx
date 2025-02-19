import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import More from '@/app/more/index';
import { useUser } from '@/hooks/queries/useUser';
import { useLogout } from '@/hooks/auth/useLogout';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

// Mock dependencies
vi.mock('@/hooks/queries/useUser', () => ({
	useUser: vi.fn(),
}));

vi.mock('@/hooks/auth/useLogout', () => ({
	useLogout: vi.fn(),
}));

describe('More Component', () => {
	const mockHandleLogout = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useLogout as Mock).mockReturnValue(mockHandleLogout);
	});

	it('renders all links correctly', () => {
		(useUser as Mock).mockReturnValue({ data: { username: 'testuser' } });

		render(
			<MemoryRouter>
				<More />
			</MemoryRouter>
		);

		// Check for all links
		const links = [
			{ text: 'Trails', href: '/more/trails' },
			{ text: 'Bucket List', href: '/more/bucket-list' },
			{ text: 'My Notes', href: '/more/my-notes' },
			{ text: 'Welcome Message', href: '/more/welcome-message' },
			{ text: 'Staying Safe', href: '/more/staying-safe' },
			{ text: 'Hiking Essentials', href: '/more/hiking-essentials' },
			{ text: 'Icon Legend', href: '/more/icon-legend' },
			{ text: 'App Info', href: '/more/app-info' },
		];

		links.forEach(({ text, href }) => {
			const linkElement = screen.getByText(text).closest('a');
			expect(linkElement).toBeInTheDocument();
			expect(linkElement).toHaveAttribute('href', href);
		});
	});

	it('displays the logged-in user\'s username', () => {
		(useUser as Mock).mockReturnValue({ data: { username: 'testuser' } });

		render(
			<MemoryRouter>
				<More />
			</MemoryRouter>
		);

		expect(screen.getByText("You are currently logged in as 'testuser'")).toBeInTheDocument();
	});

	// it('handles missing user data gracefully', () => {
	// 	(useUser as Mock).mockReturnValue({ data: null });

	// 	render(
	// 		<MemoryRouter>
	// 			<More />
	// 		</MemoryRouter>
	// 	);

	// 	expect(screen.getByText("You are currently logged in as ''")).toBeInTheDocument();
	// });

	it('calls handleLogout when the logout button is clicked', () => {
		(useUser as Mock).mockReturnValue({ data: { username: 'testuser' } });

		render(
			<MemoryRouter>
				<More />
			</MemoryRouter>
		);

		const logoutButton = screen.getByText('Log out');
		fireEvent.click(logoutButton);

		expect(mockHandleLogout).toHaveBeenCalledTimes(1);
	});
});
