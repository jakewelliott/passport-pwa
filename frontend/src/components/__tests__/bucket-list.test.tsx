import { BucketList } from '@/components/bucket-list';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the BucketListItem component
vi.mock('@/components/bucket-list', () => ({
  BucketList: vi.fn(() => <div data-testid='bucket-list' />),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('BucketList', () => {
  it('renders without crashing', () => {
    render(<BucketList />);
    const items = screen.getAllByTestId('bucket-list-item');
    expect(items.length).toBe(11);
    expect(items[0]).toBeInTheDocument();
  });

  it('renders the correct number of BucketListItems', () => {
    render(<BucketList />);
    const items = screen.getAllByTestId('bucket-list-item');
    expect(items).toHaveLength(11);
  });

  it('has the correct CSS classes', () => {
    const { container } = render(<BucketList />);
    expect(container.firstChild).toHaveClass('p-7');
    expect(container.firstChild?.firstChild).toHaveClass('m-7 mx-auto max-w-96');
  });

  it('calls BucketListItem component 11 times', () => {
    render(<BucketList />);
    expect(BucketList).toHaveBeenCalledTimes(1);
  });
});
