import { TrailDetailView } from '@/app/more/components/trail-details';
import { mockTrail } from '@/lib/testing/mock';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('TrailDetailView', () => {
  it('renders trail name with correct styling', () => {
    render(<TrailDetailView trail={mockTrail} />);
    const trailName = screen.getByText(`${mockTrail.trailName}:`);
    expect(trailName).toBeInTheDocument();
    expect(trailName).toHaveClass('text-secondary_orange');
  });

  it('renders rest of trail details', () => {
    render(<TrailDetailView trail={mockTrail} />);
    expect(screen.getByText(mockTrail.length)).toBeInTheDocument();
    expect(screen.getByText(mockTrail.description)).toBeInTheDocument();
  });

  it('renders bullet points with correct styling', () => {
    render(<TrailDetailView trail={mockTrail} />);
    const bullets = screen.getAllByText('▪');
    expect(bullets).toHaveLength(2);
    for (const bullet of bullets) {
      expect(bullet).toHaveClass('text-secondary_orange');
    }
  });

  // TODO: trail icons aren't stored in db yet
  // it('renders trail icons component', () => {
  // 	render(<TrailDetailView trail={mockTrail} />);
  // 	expect(screen.getByTestId('trail-icons')).toBeInTheDocument();
  // });
});
