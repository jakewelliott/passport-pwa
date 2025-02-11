import { render, screen, fireEvent } from '@testing-library/react';
import CollectStamp from '../collect-stamp';
import parks from '@/lib/mock/parks';

describe('CollectStamp', () => {
	const mockPark = parks[0];

	beforeEach(() => {
		render(<CollectStamp />);
	});

	it('renders the congratulatory header', () => {
		expect(screen.getByText('Woohoo!!!')).toBeInTheDocument();
	});

	it('displays the park name in the message', () => {
		const message = screen.getByText(new RegExp(mockPark.name));
		expect(message).toBeInTheDocument();
		expect(message.textContent).toContain('Your location indicates that you are at');
		expect(message.textContent).toContain('You have not collected the badge at this location yet.');
	});

	it('renders the collect button', () => {
		const collectButton = screen.getByText('Collect!');
		expect(collectButton).toBeInTheDocument();
		expect(collectButton.closest('button')).toHaveClass('rounded-button');
	});

	it('displays the park stamp image', () => {
		const stampImage = screen.getByAltText(`${mockPark.name} stamp`);
		expect(stampImage).toBeInTheDocument();
		expect(stampImage).toHaveAttribute('src', `/stamps/${mockPark.abbreviation}.svg`);
		expect(stampImage).toHaveAttribute('width', '150px');
	});

	it('renders the close button', () => {
		const closeButton = screen.getByText('×');
		expect(closeButton).toBeInTheDocument();
		expect(closeButton).toHaveClass('cursor-pointer', 'font-bold', 'text-h1', 'text-supporting_darkgray');
	});

	it('has the correct modal styling', () => {
		const modal = screen.getByText('Woohoo!!!').closest('div');
		expect(modal).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-secondary_lightblue');
		expect(modal).toHaveStyle({ zIndex: 9999 });
	});

	it('has the correct content container styling', () => {
		const container = screen.getByText('Woohoo!!!').closest('.m-auto');
		expect(container).toHaveClass('flex', 'max-w-3xl', 'flex-col', 'items-center', 'gap-8', 'text-center');
	});
});
