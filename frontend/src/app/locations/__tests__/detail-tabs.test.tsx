import { useBucketList } from '@/hooks/queries/useBucketList';
import { usePark } from '@/hooks/queries/useParks';
import { useUser } from '@/hooks/queries/useUser';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import DetailTabs from '../detail-tabs';

// Mock the hooks
vi.mock('@/hooks/queries/useParks');
vi.mock('@/hooks/queries/useUser');

const mockUsePark = usePark as Mock;
const mockUseParkActivity = useBucketList as Mock;
const mockUseUser = useUser as Mock;

describe('DetailTabs', () => {
  const mockPark = {
    id: 45,
    parkName: 'Carolina Beach State Park',
    coordinates: {
      longitude: -77.9066,
      latitude: 34.0472,
    },
    phone: 9104588206,
    email: 'carolina.beach@ncparks.gov',
    establishedYear: '1969',
    landmark: 'Sugarloaf Dune',
    youCanFind: 'the Venus flytrap',
    trails: '■ 9 trails\n\n■ 1 wheelchair-accessible trail',
    website: 'https://www.ncparks.gov/state-parks/carolina-beach-state-park',
    addresses: [
      {
        title: 'Main Address',
        addressesLineOne: '1010 State Park Road',
        addressesLineTwo: '',
        city: 'Carolina Beach',
        state: 'NC',
        zipcode: 28428,
      },
    ],
    icons: [{ iconName: 'CamperCabins-Green' }],
    bucketListItems: [{ task: 'Find a venus flytrap' }],
    photos: [{ photoPath: 'CABE.jpg', alt: 'Carolina Beach State Park main image' }],
    abbreviation: 'CABE',
  };

  const mockParkActivity = {
    completedBucketListItems: [{ id: 7 }],
    stampCollectedAt: '2024-02-16T06:48:06Z',
    privateNote: {
      id: 1,
      note: 'Hello!',
    },
    lastVisited: '2025-02-15T06:48:06Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePark.mockReturnValue({ data: mockPark, isLoading: false });
    mockUseParkActivity.mockReturnValue({ data: mockParkActivity, isLoading: false, refetch: () => {} });
    mockUseUser.mockReturnValue({ data: { role: 'user' }, isLoading: false });
  });

  const renderDetailTabs = () => {
    renderWithClient(
      <Routes>
        <Route path='/locations/:abbreviation' element={<DetailTabs />} />
      </Routes>,
      { routerProps: { initialEntries: ['/locations/CABE'] } },
    );
  };

  it('shows loading placeholder when data is loading', async () => {
    mockUsePark.mockReturnValue({ data: null, isLoading: true });
    mockUseParkActivity.mockReturnValue({ data: null, isLoading: true, refetch: () => {} });

    renderDetailTabs();
    expect(await screen.findByTestId('loading-placeholder')).toBeInTheDocument();
  });

  it('shows loading placeholder when park data is null', async () => {
    mockUsePark.mockReturnValue({ data: null, isLoading: false });
    mockUseParkActivity.mockReturnValue({ data: null, isLoading: false, refetch: () => {} });

    renderDetailTabs();
    expect(await screen.findByTestId('loading-placeholder')).toBeInTheDocument();
  });

  it('renders all components when park data is available', async () => {
    renderDetailTabs();

    await waitFor(() => {
      // Check if LocationContact is rendered
      expect(screen.getByTestId('location-contact')).toBeInTheDocument();

      // Check if LocationActionBar is rendered
      expect(screen.getByTestId('location-action-bar')).toBeInTheDocument();

      // Check if LocationMiniTabBar and its children are rendered
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Photos')).toBeInTheDocument();
      expect(screen.getByText('Notes')).toBeInTheDocument();

      // Verify the default tab content is visible (Details tab)
      expect(screen.getByText('Established:')).toBeInTheDocument();
    });
  });

  it('passes correct park data to child components', async () => {
    renderDetailTabs();

    await waitFor(() => {
      // Check for park name
      const parkNameElements = screen.getAllByText(/Carolina Beach/);
      expect(parkNameElements).toHaveLength(2); // Assuming there are two elements with this text

      // Check for city
      expect(screen.getByText(/Carolina Beach, NC/)).toBeInTheDocument();

      // Check for established year
      expect(screen.getByText(/1969/)).toBeInTheDocument();
    });
  });

  it('passes correct park activity data to child components', async () => {
    renderDetailTabs();

    await waitFor(() => {
      const achievementsElement = screen.getByTestId('achievements-view');
      expect(achievementsElement).toHaveTextContent(/Stamp collected/);
      expect(achievementsElement).toHaveTextContent("2/16/24 at 1:48 AM");

      expect(achievementsElement).toHaveTextContent(/Bucket List Item/);
      expect(achievementsElement).toHaveTextContent(/Find a venus flytrap/);
    });
  });

  it('shows loading placeholder when park is loading', () => {
    mockUsePark.mockReturnValue({ data: null, isLoading: true });
    mockUseParkActivity.mockReturnValue({ data: null, isLoading: false, refetch: () => {} });
    
    renderWithClient(
      <Routes>
        <Route path='/locations/:abbreviation' element={<DetailTabs />} />
      </Routes>,
      { routerProps: { initialEntries: ['/locations/CABE'] } },
    );
    expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
  });

  it('fetches park activity for non-admin users', () => {
    mockUsePark.mockReturnValue({ data: mockPark, isLoading: false });
    mockUseParkActivity.mockReturnValue({ 
      data: mockParkActivity, 
      isLoading: false,
      refetch: () => {}
    });

    renderWithClient(
      <Routes>
        <Route path='/locations/:abbreviation' element={<DetailTabs />} />
      </Routes>,
      { routerProps: { initialEntries: ['/locations/CABE'] } },
    );
    // Verify components are rendered with park activity data
    expect(screen.getByTestId('location-contact')).toBeInTheDocument();
  });

  it('does not fetch park activity for admin users', () => {
    mockUseUser.mockReturnValue({ data: { role: 'admin' }, isLoading: false });
    mockUsePark.mockReturnValue({ data: mockPark, isLoading: false });
    mockUseParkActivity.mockReturnValue({ 
      data: mockParkActivity, 
      isLoading: false 
    });
    
    renderWithClient(
      <Routes>
        <Route path='/locations/:abbreviation' element={<DetailTabs />} />
      </Routes>,
      { routerProps: { initialEntries: ['/locations/CABE'] } },
    );
    // Verify components are rendered without park activity data
    expect(screen.getByTestId('location-contact')).toBeInTheDocument();
    expect(mockUseParkActivity).not.toHaveBeenCalled();
  });
});
