import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header';
import * as usePageTitleHook from '@/hooks/usePageTitle';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

describe('Header', () => {
	const mockUsePageTitle = jest.spyOn(usePageTitleHook, 'usePageTitle');

	beforeEach(() => {
		mockNavigate.mockClear();
	});

	it('hides back button at top level pages', () => {
		mockUsePageTitle.mockReturnValue({
			pageTitle: 'Stamps',
			showBackButton: false,
		});

		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		expect(screen.queryByText('Back')).not.toBeInTheDocument();
		expect(screen.getByText('Stamps')).toBeInTheDocument();
	});

	it('shows back button on nested pages', () => {
		mockUsePageTitle.mockReturnValue({
			pageTitle: 'Park Details',
			showBackButton: true,
		});

		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		expect(screen.getByText('Back')).toBeInTheDocument();
		expect(screen.getByText('Park Details')).toBeInTheDocument();
	});

	it('navigates back when back button is clicked', () => {
		mockUsePageTitle.mockReturnValue({
			pageTitle: 'Park Details',
			showBackButton: true,
		});

		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		const backButton = screen.getByText('Back').closest('button');
		if (!backButton) {
			throw new Error('Back button not found');
		}
		fireEvent.click(backButton);
		expect(mockNavigate).toHaveBeenCalledWith(-1);
	});

	it('has correct styling', () => {
		mockUsePageTitle.mockReturnValue({
			pageTitle: 'Test Title',
			showBackButton: true,
		});

		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		const header = screen.getByRole('banner');
		expect(header).toHaveClass('relative', 'flex', 'items-center', 'justify-center', 'bg-secondary_darkteal', 'p-4');
		expect(header).toHaveStyle({ height: '50px' });

		const title = screen.getByText('Test Title');
		expect(title).toHaveClass('text-system_white');
	});
}); 