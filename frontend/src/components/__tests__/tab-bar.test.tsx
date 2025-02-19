import * as useUserHook from '@/hooks/queries/useUser';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import TabBar from '../tab-bar';

// Mock the useLocation hook
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useLocation: vi.fn(),
	};
});

// Mock the useUser hook
vi.mock('@/hooks/queries/useUser');

const mockUseLocation = useLocation as Mock;
const mockUseUser = useUserHook.useUser as Mock;

describe('TabBar', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseLocation.mockReturnValue({ pathname: '/' });
		mockUseUser.mockReturnValue({ data: { username: 'testuser', role: 'visitor' } });
	});

	it('renders all navigation tabs for visitor role', () => {
		renderWithClient(<TabBar />);

		const tabs = ['Locations', 'Stamps', 'More'];
		for (const tab of tabs) {
			const tabElement = screen.getByText(tab);
			expect(tabElement).toBeInTheDocument();
			expect(tabElement.closest('a')).toHaveAttribute('href', `/${tab.toLowerCase()}`);
		}
	});

	it('highlights active tab based on current route', () => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps' });
		renderWithClient(<TabBar />);

		const stampsTab = screen.getByText('Stamps').closest('div');
		const locationsTab = screen.getByText('Locations').closest('div');
		const moreTab = screen.getByText('More').closest('div');

		expect(stampsTab).toHaveClass('text-system_white');
		expect(locationsTab).toHaveClass('text-supporting_inactiveblue');
		expect(moreTab).toHaveClass('text-supporting_inactiveblue');
	});

	it('shows correct tabs for admin role', () => {
		mockUseUser.mockReturnValue({ data: { role: 'admin', username: 'admin' } });
		renderWithClient(<TabBar />);

		expect(screen.getByText('Locations')).toBeInTheDocument();
		expect(screen.getByText('More')).toBeInTheDocument();
		expect(screen.getByText('Stamps')).toBeInTheDocument();

		// Verify correct links
		expect(screen.getByText('Locations').closest('a')).toHaveAttribute('href', '/locations');
		expect(screen.getByText('More').closest('a')).toHaveAttribute('href', '/more');
		expect(screen.getByText('Stamps').closest('a')).toHaveAttribute('href', '/stamps');
	});

	it('returns null when user data is loading', () => {
		mockUseUser.mockReturnValue({ isLoading: true, data: undefined });
		const { container } = renderWithClient(<TabBar />);
		expect(container.firstChild).toBeNull();
	});

	it('returns null when user data is undefined', () => {
		mockUseUser.mockReturnValue({ data: undefined, isLoading: false });
		const { container } = renderWithClient(<TabBar />);
		expect(container.firstChild).toBeNull();
	});

	it('highlights tab when pathname partially matches', () => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps/details' });
		renderWithClient(<TabBar />);

		const stampsTab = screen.getByText('Stamps').closest('div');
		const locationsTab = screen.getByText('Locations').closest('div');
		const moreTab = screen.getByText('More').closest('div');

		expect(stampsTab).toHaveClass('text-system_white');
		expect(locationsTab).toHaveClass('text-supporting_inactiveblue');
		expect(moreTab).toHaveClass('text-supporting_inactiveblue');
	});

	it('renders icons for each tab', () => {
		renderWithClient(<TabBar />);

		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(3);

		// Just verify that each link has an SVG icon
		for (const link of links) {
			const svg = link.querySelector('svg');
			expect(svg).toBeInTheDocument();
		}
	});
}); 