import { render, screen } from '@testing-library/react';
import Layout from '../layout';
import { useUser } from '@/hooks/queries/useUser';

// Mock the useUser hook
jest.mock('@/hooks/queries/useUser');

describe('Layout Component', () => {
  const mockChildren = <div data-testid="mock-children">Mock Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children without navigation when user is null and not loading', () => {
    (useUser as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('renders children without navigation when user is null and loading', () => {
    (useUser as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('renders children with navigation when user is present and not loading', () => {
    (useUser as jest.Mock).mockReturnValue({ data: { id: '1' }, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('overflow-y-auto', 'pt-12', 'pb-16', 'h-dvh');
  });

  test('applies min-h-screen class to the outer div', () => {
    (useUser as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children').parentElement).toHaveClass('min-h-screen');
  });
});
