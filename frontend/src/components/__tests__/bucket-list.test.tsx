import { BucketList } from '@/components/bucket-list';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Bucket List', () => {
    beforeEach(async () => {
        renderWithClient(<BucketList />);
        await waitFor(() => {
            expect(screen.getByText('Park Bucket List:')).toBeInTheDocument();
        });
    });

    it('renders all bucket list items', async () => {
        await waitFor(() => {
            const items = screen.getAllByTestId('bucket-list-item');
            expect(items.length).toBeGreaterThanOrEqual(45);
            expect(items[0]).toBeInTheDocument();
        });
    });
});
