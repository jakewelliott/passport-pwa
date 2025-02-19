import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TabBar from '../tab-bar';
import RoundedButton from '../rounded-button';
import { LoadingPlaceholder } from '../loading-placeholder';
import { SplashScreen } from '../splash-screen';
import { ImageModal } from '../image-modal';
import Header from '../header';
import { TrailIcons } from '../trail-icons';
import ListRow from '../list-row';
import { PassportHeader } from '../passport-header';
import { describe, it, expect, vi } from 'vitest';

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
		isLoading: false
	})
}));

// Mock the usePageTitle hook
vi.mock('@/hooks/usePageTitle', () => ({
	usePageTitle: () => ({
		pageTitle: 'Test Title',
		showBackButton: true
	})
}));

describe('Component Snapshots', () => {
	it('TabBar renders correctly', () => {
		const { container } = render(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>
		);
		expect(container).toMatchSnapshot();
	});

	it('RoundedButton renders correctly', () => {
		const { container } = render(
			<RoundedButton
				title="Test Button"
				color="secondary_darkteal"
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('LoadingPlaceholder renders correctly', () => {
		const { container } = render(<LoadingPlaceholder what="test" />);
		expect(container).toMatchSnapshot();
	});

	it('SplashScreen renders correctly', () => {
		const { container } = render(<SplashScreen />);
		expect(container).toMatchSnapshot();
	});

	it('ImageModal renders correctly', () => {


		const { container } = render(
			<ImageModal
				photo={{ photoPath: 'test.jpg', caption: 'Test Image' }}
				onClose={() => { }}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('Header renders correctly', () => {
		const { container } = render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);
		expect(container).toMatchSnapshot();
	});

	it('TrailIcons renders correctly', () => {
		const mockTrail = {
			trailName: 'Test Trail',
			trailIcons: ['Hiking-Red', 'Camping-Green'],
			distance: '2.5 miles',
			description: 'A test trail'
		};

		const { container } = render(
			<TrailIcons
				trail={mockTrail}
				size="md"
				showText={true}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('ListRow renders correctly', () => {
		const { container } = render(
			<ListRow>
				<div>Test List Row</div>
			</ListRow>
		);
		expect(container).toMatchSnapshot();
	});

	it('PassportHeader renders correctly', () => {
		const { container } = render(<PassportHeader />);
		expect(container).toMatchSnapshot();
	});
}); 