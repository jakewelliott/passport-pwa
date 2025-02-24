import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Header from '../header';
import { ImageModal } from '../image-modal';
import ListRow from '../list-row';
import { LoadingPlaceholder } from '../loading-placeholder';
import { PassportHeader } from '../passport-header';
import RoundedButton from '../rounded-button';
import { SplashScreen } from '../splash-screen';
import TabBar from '../tab-bar';
import { TrailIcons } from '../trail-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock the useUser hook
vi.mock('@/hooks/queries/useUser', () => ({
  useUser: () => ({
    data: { role: 'visitor' },
    isLoading: false,
  }),
}));

// Mock the usePageTitle hook
vi.mock('@/hooks/usePageTitle', () => ({
  usePageTitle: () => ({
    pageTitle: 'Test Title',
    showBackButton: true,
  }),
}));

describe('Component Snapshots', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('TabBar renders correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <TabBar />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('RoundedButton renders correctly', () => {
    const { container } = render(<RoundedButton title='Test Button' color='secondary_darkteal' />);
    expect(container).toMatchSnapshot();
  });

  it('LoadingPlaceholder renders correctly', () => {
    const { container } = render(<LoadingPlaceholder what='test' />);
    expect(container).toMatchSnapshot();
  });

  it('SplashScreen renders correctly', () => {
    const { container } = render(<SplashScreen />);
    expect(container).toMatchSnapshot();
  });

  it('ImageModal renders correctly', () => {
    const { container } = render(
      <ImageModal photo={{ photoPath: 'test.jpg', caption: 'Test Image' }} onClose={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Header renders correctly', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('TrailIcons renders correctly', () => {
    const mockTrail = {
      trailName: 'Test Trail',
      trailIcons: ['Hiking-Red', 'Camping-Green'],
      distance: '2.5 miles',
      description: 'A test trail',
    };

    const { container } = render(<TrailIcons trail={mockTrail} size='md' showText={true} />);
    expect(container).toMatchSnapshot();
  });

  it('ListRow renders correctly', () => {
    const { container } = render(
      <ListRow>
        <div>Test List Row</div>
      </ListRow>,
    );
    expect(container).toMatchSnapshot();
  });

  it('PassportHeader renders correctly', () => {
    const { container } = render(<PassportHeader />);
    expect(container).toMatchSnapshot();
  });
});
