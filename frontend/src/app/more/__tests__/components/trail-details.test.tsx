import { TrailDetailView } from '@/app/more/components/trail-details';
import type { Trail } from '@/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the TrailIcons component
vi.mock('@/components/trail-icons', () => ({
  TrailIcons: () => <div data-testid='trail-icons' />,
}));

describe('TrailDetailView', () => {
  const mockTrail: Trail = {
    trailName: 'Test Trail',
    distance: '2.5 miles',
    description: 'A beautiful hiking trail',
    trailIcons: ['Hiking-Red.svg', 'Loop-Red.svg'],
  };

  it('renders trail name with correct styling', () => {
    render(<TrailDetailView trail={mockTrail} />);

    const trailName = screen.getByText(/Test Trail:/);
    expect(trailName).toBeInTheDocument();
    expect(trailName).toHaveClass('text-secondary_orange');
  });

  it('renders trail icons component', () => {
    render(<TrailDetailView trail={mockTrail} />);

    expect(screen.getByTestId('trail-icons')).toBeInTheDocument();
  });

  it('renders trail distance and description', () => {
    render(<TrailDetailView trail={mockTrail} />);

    expect(screen.getByText(/2\.5 miles/)).toBeInTheDocument();
    expect(screen.getByText(/A beautiful hiking trail/)).toBeInTheDocument();
  });

  it('renders bullet points with correct styling', () => {
    render(<TrailDetailView trail={mockTrail} />);

    const bullets = screen.getAllByText('▪');
    expect(bullets).toHaveLength(2);
    for (const bullet of bullets) {
      expect(bullet).toHaveClass('text-secondary_orange');
    }
  });

  it('applies correct container styling', () => {
    render(<TrailDetailView trail={mockTrail} />);

    const container = screen.getByText(/Test Trail/).closest('p');
    expect(container).toHaveClass('mb-2');
  });
});
