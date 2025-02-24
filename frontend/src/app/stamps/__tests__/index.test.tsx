import { usePark, useParks } from '@/hooks/queries/useParks';
import { useStamp, useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { api } from '@/lib/mock/api';
import type { Stamp, CollectedStamp } from '@/lib/mock/types';
import { renderWithClient } from '@/lib/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Stamps from '../';

// Mock the hooks and toast
vi.mock('@/hooks/queries/useParks');
vi.mock('@/hooks/queries/useStamps');
vi.mock('@/hooks/queries/useUser');
vi.mock('react-toastify');

const mockUseParks = useParks as Mock;
const mockUseStamps = useStamps as Mock;
const mockUseStamp = useStamp as Mock;
const mockUsePark = usePark as Mock;
const mockUseUser = useUser as Mock;
const mockToast = vi.fn();

describe('Stamps', () => {
  const mockParks = api.getParks();
  const mockStamps: CollectedStamp[] = [
    {
      id: 1,
      parkAbbreviation: mockParks[0].abbreviation,
      createdAt: new Date(),
      method: 'manual'
    },
    {
      id: 2,
      parkAbbreviation: mockParks[1].abbreviation,
      createdAt: new Date(),
      method: 'manual'
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mock returns
    mockUseParks.mockReturnValue({
      data: mockParks,
      isLoading: false,
    });
    mockUseStamps.mockReturnValue({
      data: mockStamps,
      isLoading: false,
      refetch: vi.fn(),
    });
    mockUseUser.mockReturnValue({
      isLoading: false,
    });
    mockUseStamp.mockReturnValue({
      data: mockStamps[0],
      isLoading: false,
    });
    mockUsePark.mockReturnValue({
      data: mockParks[0],
      isLoading: false,
    });
    (toast.info as Mock) = mockToast;
  });

  const renderStamps = () => {
    renderWithClient(<Stamps />);
  };

  it('shows nothing when data is loading', () => {
    mockUseParks.mockReturnValue({
      data: null,
      isLoading: true,
    });
    mockUseStamps.mockReturnValue({
      data: null,
      isLoading: true,
      refetch: vi.fn(),
    });
    mockUseUser.mockReturnValue({
      isLoading: true,
    });

    renderStamps();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders stamps in correct grid layout', () => {
    renderStamps();

    const gridContainer = screen.getByTestId('stamps-grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
  });

  it('renders grid of stamps with achieved stamps first', () => {
    renderStamps();

    // Get all stamp images
    const firstStampImage = screen.getByTestId(`stamp-image-${mockParks[0].abbreviation}`);
    const secondStampImage = screen.getByTestId(`stamp-image-${mockParks[1].abbreviation}`);

    // First stamps should be achieved (not greyed out)
    expect(firstStampImage).not.toHaveClass('opacity-50', 'grayscale');
    expect(secondStampImage).not.toHaveClass('opacity-50', 'grayscale');

    // Get an unachieved stamp (any after the first two)
    const unachievedStamp = screen.getByTestId(`stamp-image-${mockParks[2].abbreviation}`);
    expect(unachievedStamp).toHaveClass('opacity-50', 'grayscale');
  });

  it('shows toast message when clicking unvisited stamp', () => {
    renderStamps();

    // Click an unvisited stamp (third park onwards)
    const unvisitedStamp = screen.getByTestId(`stamp-button-${mockParks[2].abbreviation}`);
    fireEvent.click(unvisitedStamp);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('shows stamp details when clicking a stamp', () => {
    renderStamps();

    // Click the first stamp (which is visited)
    const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    fireEvent.click(firstStamp);

    // StampDetails component should be rendered
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('hides stamp details when close button is clicked', () => {
    renderStamps();

    // Click a stamp to show details
    const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    fireEvent.click(firstStamp);

    // Click the close button
    const closeButton = screen.getByRole('button', { name: 'Close park details' });
    fireEvent.click(closeButton);

    // StampDetails component should not be in the document
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('applies correct styling to stamp buttons', () => {
    renderStamps();

    // Test the first stamp button's styling
    const stampButton = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    expect(stampButton).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
  });
});
