import { BucketListItemView } from '@/components/bucket-list-item';
import { mockBucketListItem } from '@/lib/testing/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mockHandler = vi.fn();

describe('BucketListItem', () => {
  it('renders with correct text content', () => {
    render(<BucketListItemView item={mockBucketListItem} handler={mockHandler} />);

    expect(screen.getByText(mockBucketListItem.task)).toBeInTheDocument();
  });

  it('renders unchecked icon when bucketList status is false', () => {
    render(<BucketListItemView item={mockBucketListItem} handler={mockHandler} />);

    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('checked-icon')).not.toBeInTheDocument();
  });
});
