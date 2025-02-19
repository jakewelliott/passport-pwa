import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PassportHeader } from '../passport-header';

describe('PassportHeader', () => {
	it('renders logo with correct attributes', () => {
		render(<PassportHeader />);

		const logo = screen.getByAltText('North Carolina Department of Parks and Rec White Logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', '/DPRLogoWhite.svg');
		expect(logo).toHaveAttribute('width', '136');
		expect(logo).toHaveAttribute('height', '103');
	});

	it('renders title text', () => {
		render(<PassportHeader />);
		expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
	});

	it('renders passport text', () => {
		render(<PassportHeader />);
		const passportText = screen.getByText('Passport');
		expect(passportText).toBeInTheDocument();
		expect(passportText).toHaveClass('script');
		expect(passportText).toHaveStyle({ paddingTop: 30 });
	});

	it('has correct container styling', () => {
		render(<PassportHeader />);
		const container = screen.getByText('North Carolina State Parks').parentElement;
		expect(container).toHaveClass('flex', 'h-2/4', 'flex-col', 'items-center', 'justify-center');
	});
}); 