import { render, screen } from '@testing-library/react';
import { HikingEssentialItem } from '../tabs/more/hiking-essential-item';

describe('HikingEssentialItem', () => {
	const defaultProps = {
		imageSrc: '/test-image.jpg',
		altText: 'Test Alt Text',
		title: 'Test Title',
		description: 'Test Description'
	};

	it('renders with all required props', () => {
		render(<HikingEssentialItem {...defaultProps} />);

		expect(screen.getByAltText(defaultProps.altText)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
	});

	it('renders image with correct attributes', () => {
		render(<HikingEssentialItem {...defaultProps} />);

		const image = screen.getByAltText(defaultProps.altText);
		expect(image).toHaveAttribute('src', defaultProps.imageSrc);
		expect(image).toHaveClass('absolute', 'inset-0', 'h-[calc(100%+6px)]', 'w-full', 'object-contain');
	});

	it('applies correct styling to title', () => {
		render(<HikingEssentialItem {...defaultProps} />);

		const title = screen.getByText(defaultProps.title);
		expect(title).toHaveClass(
			'min-h-[20px]',
			'w-full',
			'hyphens-auto',
			'break-words',
			'bg-supporting_inactiveblue',
			'p-1.5',
			'text-center',
			'text-[clamp(11px,calc(24/550*100vw),24px)]',
			'text-system_white',
			'leading-[clamp(8px,calc(20/550*100vw),20px)]'
		);
	});

	it('applies correct styling to description', () => {
		render(<HikingEssentialItem {...defaultProps} />);

		const description = screen.getByText(defaultProps.description);
		expect(description).toHaveClass(
			'w-full',
			'bg-supporting_lightblue',
			'p-mini',
			'py-3',
			'text-center',
			'text-[clamp(12px,calc(18/550*100vw),18px)]',
			'leading-[clamp(16px,calc(22/550*100vw),22px)]'
		);
	});

	it('applies correct styling to image container', () => {
		render(<HikingEssentialItem {...defaultProps} />);

		const imageContainer = screen.getByAltText(defaultProps.altText).parentElement;
		expect(imageContainer).toHaveClass(
			'relative',
			'aspect-[1/.5]',
			'w-full',
			'rounded-t-full',
			'bg-supporting_lightblue'
		);
	});
}); 