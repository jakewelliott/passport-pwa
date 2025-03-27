import { trails } from '@/lib/testing/mock/tables';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from '../header';
import { ImageModal } from '../image-modal';
import ListRow from '../list-row';
import { LoadingPlaceholder } from '../loading-placeholder';
import { PassportHeader } from '../passport-header';
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

// // Mock the useUser hook
// vi.mock('@/hooks/queries/useUser', () => ({
// 	vi.mock('@/hooks/queries/useUser', () => ({
// 		useUser: () => ({
// 			data: { role: 'visitor' },
// 			isLoading: false,
// 		}),
// 		isLoading: false,
// 	}),
// }))

// // Mock the usePageTitle hook
// vi.mock('@/hooks/usePageTitle', () => ({
// 	vi.mock('@/hooks/usePageTitle', () => ({
// 		usePageTitle: () => ({
// 			pageTitle: 'Test Title',
// 			showBackButton: true,
// 		}),
// 		showBackButton: true,
// 	}),
// }))

describe('Component Snapshots', () => {
    it('TabBar renders correctly', () => {
        renderWithClient(<TabBar />);
        expect(screen.getByText('Locations')).toBeInTheDocument();
    });

    it('RoundedButton renders correctly', () => {
        renderWithClient(<RoundedButton title='Test Button' color='secondary_darkteal' />);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('LoadingPlaceholder renders correctly', () => {
        renderWithClient(<LoadingPlaceholder what='test' />);
        expect(screen.getByText('Loading test...')).toBeInTheDocument();
    });

    it('SplashScreen renders correctly', () => {
        renderWithClient(<SplashScreenView />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('ImageModal renders correctly', () => {
        renderWithClient(<ImageModal photo={{ photo: 'test.jpg', alt: 'Test Image' }} onClose={() => {}} />);
        expect(screen.getByText('Test Image')).toBeInTheDocument();
    });

    it('Header renders correctly', () => {
        renderWithClient(<Header />);
        expect(screen.getByText('Locations')).toBeInTheDocument();
    });

    it('TrailIcons renders correctly', () => {
        renderWithClient(<TrailIcons trail={mockTrail} size='md' showText={true} />);
        expect(screen.getByText('Trail')).toBeInTheDocument();
    });

    it('ListRow renders correctly', () => {
        renderWithClient(
            <ListRow>
                <div>Test List Row</div>
            </ListRow>,
        );
        expect(screen.getByText('Test List Row')).toBeInTheDocument();
    });

    it('PassportHeader renders correctly', () => {
        renderWithClient(<PassportHeader />);
        expect(screen.getByText('Locations')).toBeInTheDocument();
    });
});
