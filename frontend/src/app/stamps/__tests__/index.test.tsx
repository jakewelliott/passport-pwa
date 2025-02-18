import { screen } from '@testing-library/react';
import { renderWithClient } from '@/lib/test-wrapper';
import Stamps from '../index';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps, useStamp } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';

// Mock the hooks and dependencies
jest.mock('@/hooks/queries/useParks');
jest.mock('@/hooks/queries/useStamps');
jest.mock('@/hooks/queries/useUser');
jest.mock('react-toastify');

const mockUseParks = useParks as jest.Mock;
const mockUseStamps = useStamps as jest.Mock;
const mockUseUser = useUser as jest.Mock;
const mockUseStamp = useStamp as jest.Mock;

const isVisited = (code: string, stamps: { code: string }[] | undefined) =>
  stamps?.some(stamp => stamp.code === code) ?? false;

describe('Stamps', () => {
  const mockParks = [
    { id: 1, parkName: 'Eno River State Park', abbreviation: 'ACAD' },
    { id: 2, parkName: 'Carvers Creek State Park', abbreviation: 'YELL' },
    { id: 3, parkName: 'Jones Lake State Park', abbreviation: 'ZION' },
  ];

  const mockStamps = [
    { code: 'ACAD', timestamp: new Date(), location: { latitude: 0, longitude: 0 } },
    { code: 'ZION', timestamp: new Date(), location: { latitude: 0, longitude: 0 } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUser.mockReturnValue({ isLoading: false });
    mockUseParks.mockReturnValue({ data: mockParks, isLoading: false });
    mockUseStamps.mockReturnValue({ data: mockStamps, isLoading: false });
    mockUseStamp.mockReturnValue({
      data: {
        code: 'ACAD',
        timestamp: new Date('2024-01-01T12:00:00Z'),
        location: { latitude: 0, longitude: 0 }
      },
      isLoading: false
    });
  });

  it('renders loading state correctly', () => {
    mockUseParks.mockReturnValue({ data: null, isLoading: true });
    const { container } = renderWithClient(<Stamps />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders stamps grid correctly', () => {
    renderWithClient(<Stamps />);
    mockParks.forEach(park => {
      const stampImage = screen.getByAltText(`${park.abbreviation} - ${
        isVisited(park.abbreviation, mockStamps) ? 'achieved' : 'greyed out'
      }`);
      expect(stampImage).toBeInTheDocument();
    });
  });

  it('applies correct styling for collected and uncollected stamps', () => {
    renderWithClient(<Stamps />);
    const collectedStamp = screen.getByAltText('ACAD - achieved');
    expect(collectedStamp).not.toHaveClass('opacity-50');
    expect(collectedStamp).not.toHaveClass('grayscale');

    const uncollectedStamp = screen.getByAltText('YELL - greyed out');
    expect(uncollectedStamp).toHaveClass('opacity-50');
    expect(uncollectedStamp).toHaveClass('grayscale');
  });

  it('sorts parks correctly with achieved stamps first', () => {
    renderWithClient(<Stamps />);
    const stampImages = screen.getAllByRole('button');
    expect(stampImages[0].querySelector('img')).toHaveAttribute('alt', 'ACAD - achieved');
    expect(stampImages[1].querySelector('img')).toHaveAttribute('alt', 'ZION - achieved');
    expect(stampImages[2].querySelector('img')).toHaveAttribute('alt', 'YELL - greyed out');
  });

  it('handles error state when fetching parks fails', () => {
    mockUseParks.mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to fetch parks') });
    renderWithClient(<Stamps />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles error state when fetching stamps fails', () => {
    mockUseStamps.mockReturnValue({ data: null, isLoading: false, error: new Error('Failed to fetch stamps') });
    renderWithClient(<Stamps />);
    
    // Check that all buttons are rendered as greyed out
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // Assuming there are 3 parks
    
    buttons.forEach(button => {
      const img = button.querySelector('img');
      expect(img).toHaveClass('opacity-50');
      expect(img).toHaveClass('grayscale');
    });
    
    // Verify that no StampDetails component is rendered
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
  
});
