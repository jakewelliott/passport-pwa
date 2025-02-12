import { render, screen } from '@testing-library/react';
import { BucketList } from '@/app/more/bucket-list';
import { BucketListItem } from '@/app/more/components/bucket-list-item';

// Mock the BucketListItem component
jest.mock('@/app/more/components/bucket-list-item', () => ({
  BucketListItem: jest.fn(() => <div data-testid="bucket-list-item" />)
}));

beforeEach(() => {
    jest.clearAllMocks();
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
    expect(BucketListItem).toHaveBeenCalledTimes(11);
  });
});
