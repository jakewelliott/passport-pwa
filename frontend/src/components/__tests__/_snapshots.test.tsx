import LocationsScreen from '@/app/locations';
import MoreScreen from '@/app/more';
import { AppInfo } from '@/app/more/app-info';
import StampsScreen from '@/app/stamps';
import { useBucketList } from '@/hooks/queries/useBucketList';
import { useNotes } from '@/hooks/queries/useNotes';
import { useParks } from '@/hooks/queries/useParks';
import { useStamps } from '@/hooks/queries/useStamps';
import { useUser } from '@/hooks/queries/useUser';
import { trails } from '@/lib/testing/mock/tables';
import { createTestQueryClient, renderWithClient } from '@/lib/testing/test-wrapper';
import type { TrailIcon } from '@/types';
import { renderHook, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Header from '../header';
import { ImageModal } from '../image-modal';
import ListRow from '../list-row';
import { LoadingPlaceholder } from '../loading-placeholder';
import RoundedButton from '../rounded-button';
import { SplashScreenView } from '../splash-screen-view';
import TabBar from '../tab-bar';
import { TrailIcons } from '../trail-icons';
const mockTrail = trails[0];

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// we will make a queryClient and put it into a wrapper
// this wrapper will be used to render all hooks before all the tests
// then the queryClient is populated with the data, and we can use it in the tests
// subsequent calls to renderWithClient will use the same queryClient but a new component tree
const queryClient = createTestQueryClient();
const { wrapper } = renderWithClient(<div />, {}, queryClient);
const render = (component: React.ReactElement) => renderWithClient(component, {}, queryClient);

// we will use this to load the data for all the hooks before all the tests
beforeAll(async () => {
    console.log('BEFORE ALL =============================');
    const { result: user } = renderHook(() => useUser(), { wrapper });
    const { result: parks } = renderHook(() => useParks(), { wrapper });
    const { result: notes } = renderHook(() => useNotes(), { wrapper });
    const { result: stamps } = renderHook(() => useStamps(), { wrapper });
    const { result: bucketList } = renderHook(() => useBucketList(), { wrapper });

    const check = (hook: any, name: string) => {
        expect(hook.current.data).toBeDefined();
        expect(hook.current.isLoading).toBe(false);
        console.log(`${name} LOADED`);
    };

    await waitFor(() => {
        check(user, 'USER');
        check(parks, 'PARKS');
        check(notes, 'NOTES');
        check(stamps, 'STAMPS');
        check(bucketList, 'BUCKET LIST');
    });
});

describe('Component Snapshots', () => {
    afterEach(() => {
        console.log('==================== AFTER EACH =====================');
        // screen.logTestingPlaygroundURL();
    });

    it('Rendered all those hooks', () => {
        // this one runs first so we use it to get rid of all the divs
        // that render hooks makes
        // count the number of divs
        const divs = screen.getAllByText('');
        console.log('DIVS', divs.length);
        expect(divs.length).toBeGreaterThan(0);
    });

    it('TabBar renders correctly', () => {
        console.log('RENDERING TAB BAR');
        const { container } = render(<TabBar />);

        // we run a test just to make sure it's not loading
        expect(screen.getByText('Locations')).toBeInTheDocument();

        // then we check the snapshot
        expect(container).toMatchSnapshot();
    });

    it('RoundedButton renders correctly', () => {
        console.log('RENDERING ROUNDED BUTTON');
        const { container } = render(<RoundedButton title='Test Button' color='secondary_darkteal' />);

        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('LoadingPlaceholder renders correctly', () => {
        console.log('RENDERING LOADING PLACEHOLDER');
        const { container } = render(<LoadingPlaceholder what='test' />);

        expect(screen.getByText('Loading test...')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('SplashScreen renders correctly', () => {
        const { container } = render(<SplashScreenView />);

        expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('ImageModal renders correctly', () => {
        const { container } = render(
            <ImageModal photo={{ photoPath: 'CABE.jpg', alt: 'Test Image' }} onClose={() => {}} />,
        );

        expect(screen.getByText('Test Image')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('Header renders correctly', () => {
        screen.logTestingPlaygroundURL();
        const { container } = render(<Header />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('TrailIcons renders correctly', () => {
        const mockIcons: TrailIcon[] = [
            { iconName: '4WDBeach', tooltip: '4WD Beach Access' },
            { iconName: 'Accessible', tooltip: 'Accessible Facilities' },
            { iconName: 'Amphiteater', tooltip: 'Amphitheater' },
            { iconName: 'BackpackCamping', tooltip: 'Backpack Camping' },
            { iconName: 'Bathhouse', tooltip: 'Bathhouse' },
        ];

        const { container } = render(<TrailIcons icons={mockIcons} size='md' showText={true} />);

        screen.debug();
        expect(screen.getByAltText('4WD Beach Access')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('ListRow renders correctly', () => {
        const { container } = render(
            <ListRow>
                <div>Test List Row</div>
            </ListRow>,
        );
        expect(screen.getByText('Test List Row')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('AppInfo renders correctly', () => {
        const { container } = render(<AppInfo />);

        expect(screen.getByText('Passport')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});

describe('Route Snapshots', () => {
    it('/locations matches snapshot', () => {
        const { container } = render(<LocationsScreen />);

        expect(screen.getByTestId('locations-list')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('/stamps matches snapshot', () => {
        const { container } = render(<StampsScreen />);

        expect(screen.getByTestId('stamps-grid')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('/more matches snapshot', () => {
        const { container } = render(<MoreScreen />);

        expect(screen.getByTestId('more-list')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
