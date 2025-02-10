import { render, screen, act } from '@testing-library/react';
import SplashScreen, { SplashScreenWrapper } from '../splash-screen';

describe('SplashScreen', () => {
  it('renders the splash screen with logo and text', () => {
    render(<SplashScreen />);

    // Check if logo is present
    expect(screen.getByAltText('North Carolina Department of Parks and Rec White Logo')).toBeInTheDocument();

    // Check if text content is present
    expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
    expect(screen.getByText('Passport')).toBeInTheDocument();
  });
});

describe('SplashScreenWrapper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows splash screen initially and then children after timeout', async () => {
    const TestChild = () => <div>Test Content</div>;

    render(
      <SplashScreenWrapper>
        <TestChild />
      </SplashScreenWrapper>,
    );

    // Initially shows splash screen
    expect(screen.getByText('North Carolina State Parks')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();

    // After timeout, shows children
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByText('North Carolina State Parks')).not.toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
