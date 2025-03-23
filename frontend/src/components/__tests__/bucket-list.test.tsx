import { BucketList } from '@/components/bucket-list';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('BucketList', () => {
	it('renders without crashing', async () => {
		renderWithClient(<BucketList />);
		// wait for the items to render
		await waitFor(() => {
			const items = screen.getAllByTestId('bucket-list-item');
			expect(items.length).toBe(11);
			expect(items[0]).toBeInTheDocument();
		});
	});

	it('renders the correct number of BucketListItems', () => {
		renderWithClient(<BucketList />);
		const items = screen.getAllByTestId('bucket-list-item');
		expect(items).toHaveLength(11);
	});

	it('calls BucketListItem component 11 times', () => {
		renderWithClient(<BucketList />);
		expect(BucketList).toHaveBeenCalledTimes(1);
	});
});
