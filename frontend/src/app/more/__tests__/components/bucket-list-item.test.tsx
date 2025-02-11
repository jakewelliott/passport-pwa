import { render, screen } from '@testing-library/react';
import { BucketListItem } from '@/app/more/components/bucket-list-item';
import { } from 'react-icons/fa';

jest.mock('react-icons/fa', () => ({
	FaRegCheckSquare: () => <div data-testid="checked-icon" />,
	FaRegSquare: () => <div data-testid="unchecked-icon" />
}));

describe('BucketListItem', () => {
	it('renders with correct text content', () => {
		render(<BucketListItem />);

		expect(screen.getByText('Participate')).toBeInTheDocument();
		expect(screen.getByText('Raleigh')).toBeInTheDocument();
		expect(screen.getByText('1/1/2025')).toBeInTheDocument();
	});

	it('renders unchecked icon when bucketList status is false', () => {
		render(<BucketListItem />);

		expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('checked-icon')).not.toBeInTheDocument();
	});

	it('has correct styling', () => {
		render(<BucketListItem />);

		const container = screen.getByText('Participate').closest('div');
		expect(container?.parentElement).toHaveClass('my-2.5', 'flex', 'items-start');

		const locationText = screen.getByText('Raleigh');
		expect(locationText).toHaveClass('p-mini', 'text-main_green');

		const dateText = screen.getByText('1/1/2025');
		expect(dateText).toHaveClass('p-mini');
	});

	it('renders content in correct layout', () => {
		render(<BucketListItem />);

		const contentContainer = screen.getByText('Participate').closest('div');
		expect(contentContainer).toHaveClass('flex', 'w-full', 'flex-col', 'justify-center');

		const detailsContainer = screen.getByText('Raleigh').closest('div');
		expect(detailsContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'justify-between', 'gap-2');
	});
}); 