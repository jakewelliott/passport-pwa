import { render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import TabBar from '../layout/tab-bar';
import * as useUserHook from '@/hooks/queries/useUser';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn(),
}));

const mockUseLocation = useLocation as jest.Mock;

describe('TabBar', () => {
	const mockUseUser = jest.spyOn(useUserHook, 'useUser');

	beforeEach(() => {
		mockUseLocation.mockReturnValue({ pathname: '/stamps' });
	});

	it('renders all tabs for visitor role', () => {
		mockUseUser.mockReturnValue({
			data: { role: 'visitor' },
		} as any);

		render(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>
		);

		expect(screen.getByText('Stamps')).toBeInTheDocument();
		expect(screen.getByText('Locations')).toBeInTheDocument();
		expect(screen.getByText('More')).toBeInTheDocument();
	});

	it('renders appropriate tabs for admin role', () => {
		mockUseUser.mockReturnValue({
			data: { role: 'admin' },
		} as any);

		render(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>
		);

		expect(screen.queryByText('Stamps')).not.toBeInTheDocument();
		expect(screen.getByText('Locations')).toBeInTheDocument();
		expect(screen.getByText('More')).toBeInTheDocument();
	});

	it('highlights active tab', () => {
		mockUseUser.mockReturnValue({
			data: { role: 'visitor' },
		} as any);

		mockUseLocation.mockReturnValue({ pathname: '/stamps' });

		render(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>
		);

		const activeTab = screen.getByText('Stamps').closest('div');
		const inactiveTab = screen.getByText('Locations').closest('div');

		expect(activeTab).toHaveClass('text-system_white');
		expect(inactiveTab).toHaveClass('text-supporting_inactiveblue');
	});

	it('has correct styling', () => {
		mockUseUser.mockReturnValue({
			data: { role: 'visitor' },
		} as any);

		render(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>
		);

		const nav = screen.getByRole('navigation');
		expect(nav).toHaveClass('fixed', 'right-0', 'bottom-0', 'left-0', 'bg-secondary_darkteal');
		expect(nav).toHaveStyle({ zIndex: '9998' });

		const ul = nav.firstChild;
		expect(ul).toHaveClass('flex', 'h-16', 'items-center', 'justify-around');
	});
}); 