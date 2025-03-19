import { LocationMiniTabBar } from '@/app/locations/components/minitab-bar';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
describe('LocationMiniTabBar', () => {
	const mockChildren = [
		<div key='details'>Details Content</div>,
		<div key='photos'>Photos Content</div>,
		<div key='notes'>Notes Content</div>,
	];

	it('renders all tab buttons', () => {
		render(<LocationMiniTabBar>{mockChildren}</LocationMiniTabBar>);
		expect(screen.getByText('Details')).toBeInTheDocument();
		expect(screen.getByText('Photos')).toBeInTheDocument();
		expect(screen.getByText('Notes')).toBeInTheDocument();
	});

	it('shows first tab content by default', () => {
		render(<LocationMiniTabBar>{mockChildren}</LocationMiniTabBar>);
		expect(screen.getByText('Details Content')).toBeInTheDocument();
		expect(screen.queryByText('Photos Content')).not.toBeInTheDocument();
		expect(screen.queryByText('Notes Content')).not.toBeInTheDocument();
	});

	it('switches content when clicking different tabs', () => {
		render(<LocationMiniTabBar>{mockChildren}</LocationMiniTabBar>);

		// Click Photos tab
		fireEvent.click(screen.getByText('Photos'));
		expect(screen.queryByText('Details Content')).not.toBeInTheDocument();
		expect(screen.getByText('Photos Content')).toBeInTheDocument();
		expect(screen.queryByText('Notes Content')).not.toBeInTheDocument();

		// Click Notes tab
		fireEvent.click(screen.getByText('Notes'));
		expect(screen.queryByText('Details Content')).not.toBeInTheDocument();
		expect(screen.queryByText('Photos Content')).not.toBeInTheDocument();
		expect(screen.getByText('Notes Content')).toBeInTheDocument();
	});

	it('applies active styles to selected tab', () => {
		render(<LocationMiniTabBar>{mockChildren}</LocationMiniTabBar>);

		const detailsTab = screen.getByText('Details').parentElement;
		const photosTab = screen.getByText('Photos').parentElement;

		expect(detailsTab).toHaveClass('text-system_black');
		expect(photosTab).toHaveClass('text-supporting_darkgray');

		fireEvent.click(screen.getByText('Photos'));

		expect(detailsTab).toHaveClass('text-supporting_darkgray');
		expect(photosTab).toHaveClass('text-system_black');
	});

	it('shows indicator line for active tab', () => {
		render(<LocationMiniTabBar>{mockChildren}</LocationMiniTabBar>);

		const tabs = screen.getAllByText(/Details|Photos|Notes/);
		const detailsIndicator = tabs[0].parentElement?.querySelector('.bg-secondary_darkteal');
		const photosIndicator = tabs[1].parentElement?.querySelector('.bg-secondary_darkteal');

		expect(detailsIndicator).not.toHaveClass('hidden');
		expect(photosIndicator).toHaveClass('hidden');

		fireEvent.click(screen.getByText('Photos'));

		expect(detailsIndicator).toHaveClass('hidden');
		expect(photosIndicator).not.toHaveClass('hidden');
	});
});
