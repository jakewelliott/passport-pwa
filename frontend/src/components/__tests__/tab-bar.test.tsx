import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import TabBar from '../tab-bar';
import * as useUserHook from '@/hooks/queries/useUser';
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn(),
}));

// Mock the useUser hook
jest.mock('@/hooks/queries/useUser');

const mockUseLocation = useLocation as jest.Mock;
const mockUseUser = useUserHook.useUser as jest.Mock;

describe('TabBar', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseLocation.mockReturnValue({ pathname: '/' });
		mockUseUser.mockReturnValue({ data: { username: 'testuser' } });
	});

	it('renders all navigation tabs', () => {
		renderWithClient(<TabBar />);

		expect(screen.getByText('Locations')).toBeInTheDocument();
		expect(screen.getByText('Stamps')).toBeInTheDocument();
		expect(screen.getByText('More')).toBeInTheDocument();
	});

	it('highlights active tab based on current route', () => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps' });
		renderWithClient(<TabBar />);

		const stampsTab = screen.getByText('Stamps').closest('div');
		expect(stampsTab).toHaveClass('text-system_white');
	});

	it('shows inactive color for non-active tabs', () => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps' });
		renderWithClient(<TabBar />);

		const locationsTab = screen.getByText('Locations').closest('div');
		const moreTab = screen.getByText('More').closest('div');

		expect(locationsTab).toHaveClass('text-supporting_inactiveblue');
		expect(moreTab).toHaveClass('text-supporting_inactiveblue');
	});

	it('has correct navigation links', () => {
		renderWithClient(<TabBar />);

		const locationsLink = screen.getByText('Locations').closest('a');
		const stampsLink = screen.getByText('Stamps').closest('a');
		const moreLink = screen.getByText('More').closest('a');

		expect(locationsLink).toHaveAttribute('href', '/locations');
		expect(stampsLink).toHaveAttribute('href', '/stamps');
		expect(moreLink).toHaveAttribute('href', '/more');
	});

	it('shows correct tabs for visitor role', () => {
		mockUseUser.mockReturnValue({ data: { role: 'visitor', username: 'testuser' } });
		renderWithClient(<TabBar />);

		expect(screen.getByText('Stamps')).toBeInTheDocument();
		expect(screen.getByText('Locations')).toBeInTheDocument();
		expect(screen.getByText('More')).toBeInTheDocument();
	});

	// it('shows correct tabs for admin role', () => {
	// 	mockUseUser.mockReturnValue({ data: { role: 'admin', username: 'admin' } });
	// 	renderWithClient(<TabBar />);

	// 	expect(screen.queryByText('Stamps')).not.toBeInTheDocument();
	// 	expect(screen.getByText('Locations')).toBeInTheDocument();
	// 	expect(screen.getByText('More')).toBeInTheDocument();
	// });

	it('renders icons for each tab', () => {
		renderWithClient(<TabBar />);

		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(3); // One for each tab

		// Verify each link has an SVG icon
		links.forEach(link => {
			expect(link.querySelector('svg')).toBeInTheDocument();
		});
	});

	it('highlights tab when pathname partially matches', () => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps/details' });
		renderWithClient(<TabBar />);

		const stampsTab = screen.getByText('Stamps').closest('div');
		expect(stampsTab).toHaveClass('text-system_white');

		const locationsTab = screen.getByText('Locations').closest('div');
		expect(locationsTab).toHaveClass('text-supporting_inactiveblue');
	});
}); 