import { DetailsMiniTab } from '@/app/locations/components/details-minitab';
import { mockPark } from '@/lib/testing/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DetailsMiniTab', () => {
	it('renders park icons container', () => {
		render(<DetailsMiniTab park={mockPark} />);
		const container = screen.getByTestId('icon-scroll-container');
		expect(container).toHaveClass('overflow-x-auto');
	});

	it('renders park icons when provided', () => {
		render(<DetailsMiniTab park={mockPark} />);
		const iconContainer = screen.getByTestId('icon-scroll-container');
		const icons = iconContainer.querySelectorAll('img');
		expect(icons.length).toBe(mockPark.icons.length);

		for (let index = 0; index < icons.length; index++) {
			const iconElement = icons[index];
			expect(iconElement).toHaveAttribute('alt', mockPark.icons[index].icon);
			expect(iconElement).toHaveAttribute('width', '55');
			expect(iconElement).toHaveAttribute('height', '55');
		}
	});
});
