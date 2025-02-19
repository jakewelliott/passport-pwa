import { IconRow } from '@/app/more/components/icon-row';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('IconRow', () => {
	const defaultProps = {
		iconName: 'test-icon.svg',
		title: 'Test Title',
	};

	it('renders with required props', () => {
		render(<IconRow {...defaultProps} />);

		const icon = screen.getByAltText(defaultProps.title);
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute('src', `../park-icons/${defaultProps.iconName}`);
		expect(icon).toHaveAttribute('width', '36px');
		expect(icon).toHaveAttribute('height', '36px');

		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
	});

	it('renders with extra text when provided', () => {
		const extraText = 'Additional Information';
		render(<IconRow {...defaultProps} extraText={extraText} />);

		expect(screen.getByText(extraText)).toBeInTheDocument();
		expect(screen.getByText(extraText)).toHaveClass('p-mini');
	});

	it('does not render extra text when not provided', () => {
		render(<IconRow {...defaultProps} />);

		const extraTextElement = screen.queryByText(/./i, { selector: 'p.p-mini' });
		expect(extraTextElement).not.toBeInTheDocument();
	});

	it('applies correct layout styling', () => {
		render(<IconRow {...defaultProps} />);

		const container = screen.getByText(defaultProps.title).closest('div')?.parentElement;
		expect(container).toHaveClass('m-4', 'flex', 'items-center');

		const contentContainer = screen.getByText(defaultProps.title).closest('div');
		expect(contentContainer).toHaveClass('ml-2', 'flex', 'w-full', 'flex-col', 'justify-center');
	});
});
