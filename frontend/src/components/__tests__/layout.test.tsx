import { useUser } from '@/hooks/queries/useUser';
import { render, screen } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import Layout from '../layout';
// Mock the useUser hook
vi.mock('@/hooks/queries/useUser');

describe('Layout Component', () => {
  const mockChildren = <div data-testid='mock-children'>Mock Children</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children without navigation when user is null and not loading', () => {
    (useUser as Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders children without navigation when user is null and loading', () => {
    (useUser as Mock).mockReturnValue({ data: null, isLoading: true });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders children with navigation when user is present and not loading', () => {
    (useUser as Mock).mockReturnValue({ data: { id: '1' }, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('overflow-y-auto', 'pt-12', 'pb-16', 'h-dvh');
  });

  it('applies min-h-screen class to the outer div', () => {
    (useUser as Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Layout>{mockChildren}</Layout>);

    expect(screen.getByTestId('mock-children').parentElement).toHaveClass('min-h-screen');
  });
});
