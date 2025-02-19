import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingPlaceholder } from '../loading-placeholder';

describe('LoadingPlaceholder', () => {
  it('renders with animation class', () => {
    const { container } = render(<LoadingPlaceholder />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders three placeholder blocks', () => {
    const { container } = render(<LoadingPlaceholder />);
    const blocks = container.getElementsByClassName('bg-gray-200');
    expect(blocks).toHaveLength(3);
  });

  it('has correct styling for each block', () => {
    const { container } = render(<LoadingPlaceholder />);
    const blocks = container.getElementsByClassName('bg-gray-200');

    // First block
    expect(blocks[0]).toHaveClass('mb-4', 'h-32', 'rounded-md', 'bg-gray-200');

    // Second block
    expect(blocks[1]).toHaveClass('mb-4', 'h-24', 'rounded-md', 'bg-gray-200');

    // Third block
    expect(blocks[2]).toHaveClass('h-48', 'rounded-md', 'bg-gray-200');
  });

  it('maintains correct block order', () => {
    const { container } = render(<LoadingPlaceholder />);
    const blocks = container.getElementsByClassName('bg-gray-200');

    expect(blocks[0]).toHaveClass('h-32');
    expect(blocks[1]).toHaveClass('h-24');
    expect(blocks[2]).toHaveClass('h-48');
  });
});
