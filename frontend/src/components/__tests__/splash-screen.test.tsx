import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SplashScreenView, SplashScreenWrapper } from '../splash-screen-view';

vi.useFakeTimers();

describe('SplashScreen', () => {
	it('renders logo with correct attributes', () => {
		render(<SplashScreenView />);

		const logo = screen.getByAltText('North Carolina Department of Parks and Rec White Logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', '/DPRLogoWhite.svg');
		expect(logo).toHaveAttribute('width', '136');
		expect(logo).toHaveAttribute('height', '103');
	});

	it('renders title and passport text', () => {
		render(<SplashScreenView />);
		expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
		expect(screen.getByText('Passport')).toBeInTheDocument();
	});

	it('has correct styling', () => {
		render(<SplashScreenView />);

		const container = screen.getByText('North Carolina State Parks').parentElement?.parentElement;
		expect(container).toHaveStyle({
			backgroundImage: "url('/photos/CRMO_FrontCover.jpg')",
			backgroundSize: '150%',
			backgroundPosition: 'center 25%',
			zIndex: 9999,
		});
		expect(container).toHaveClass('fixed', 'inset-0', 'flex', 'flex-col', 'items-center', 'bg-no-repeat');

		const passportText = screen.getByText('Passport');
		expect(passportText).toHaveClass('script');
		expect(passportText).toHaveStyle({ paddingTop: 30 });
	});
});

describe('SplashScreenWrapper', () => {
	it('initially shows splash screen', () => {
		render(
			<SplashScreenWrapper>
				<div>Child Content</div>
			</SplashScreenWrapper>,
		);

		expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
		expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
	});

	it('shows children after timeout', async () => {
		render(
			<SplashScreenWrapper>
				<div>Child Content</div>
			</SplashScreenWrapper>,
		);

		// Initially splash screen is shown
		expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();

		// Advance timers
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// Now children should be shown
		expect(screen.getByText('Child Content')).toBeInTheDocument();
		expect(screen.queryByText('North Carolina State Parks')).not.toBeInTheDocument();
	});

	it('cleans up timer on unmount', () => {
		const { unmount } = render(
			<SplashScreenWrapper>
				<div>Child Content</div>
			</SplashScreenWrapper>,
		);

		const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
		unmount();
		expect(clearTimeoutSpy).toHaveBeenCalled();
		clearTimeoutSpy.mockRestore();
	});
});
