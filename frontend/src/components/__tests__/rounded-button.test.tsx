import { render, screen } from '@testing-library/react';
import RoundedButton from '../rounded-button';

describe('RoundedButton', () => {
	it('renders with default props', () => {
		render(<RoundedButton title="Click me" />);
		expect(screen.getByText('Click me')).toBeInTheDocument();
		const buttonDiv = screen.getByText('Click me').parentElement;
		expect(buttonDiv).toHaveClass('bg-secondary_darkteal');
	});

	it('renders with custom color', () => {
		render(<RoundedButton title="Custom Button" color="system_black" />);
		expect(screen.getByText('Custom Button')).toBeInTheDocument();
		const buttonDiv = screen.getByText('Custom Button').parentElement;
		expect(buttonDiv).toHaveClass('bg-system_black');
	});

	it('has correct styling', () => {
		render(<RoundedButton title="Style Test" />);
		const buttonDiv = screen.getByText('Style Test').parentElement;
		expect(buttonDiv).toHaveStyle({
			width: '146px',
			height: '50px',
			borderRadius: '25px'
		});
		expect(buttonDiv).toHaveClass('flex', 'cursor-pointer', 'select-none', 'items-center', 'justify-center');
	});
}); 