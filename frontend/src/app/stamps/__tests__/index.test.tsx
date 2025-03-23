import { parks } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StampsScreen from '../';

describe('Stamps', () => {
  const mockParks = parks;

  it('renders stamps in correct grid layout', () => {
    renderWithClient(<StampsScreen />);
    const gridContainer = screen.getByTestId('stamps-grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
  });

  it('renders grid of stamps with achieved stamps first', () => {
    renderWithClient(<StampsScreen />);

    // Get all stamp images
    const firstStampImage = screen.getByTestId(`stamp-image-${mockParks[0].abbreviation}`);
    const secondStampImage = screen.getByTestId(`stamp-image-${mockParks[1].abbreviation}`);

    // First stamps should be achieved (not greyed out)
    expect(firstStampImage).not.toHaveClass('opacity-50', 'grayscale');
    expect(secondStampImage).not.toHaveClass('opacity-50', 'grayscale');

    // Get an unachieved stamp (any after the first two)
    const unachievedStamp = screen.getByTestId(`stamp-image-${mockParks[2].abbreviation}`);
    expect(unachievedStamp).toHaveClass('opacity-50', 'grayscale');
  });

  it('shows stamp details when clicking unvisited stamp', () => {
    renderWithClient(<StampsScreen />);

    // Click an unvisited stamp (third park onwards)
    const unvisitedStamp = screen.getByTestId(`stamp-button-${mockParks[2].abbreviation}`);
    fireEvent.click(unvisitedStamp);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('shows stamp details when clicking a stamp', () => {
    renderWithClient(<StampsScreen />);

    // Click the first stamp (which is visited)
    const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    fireEvent.click(firstStamp);

    // StampDetails component should be rendered
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('hides stamp details when close button is clicked', () => {
    renderWithClient(<StampsScreen />);

    // Click a stamp to show details
    const firstStamp = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    fireEvent.click(firstStamp);

    // Click the close button
    const closeButton = screen.getByRole('button', { name: 'Close park details' });
    fireEvent.click(closeButton);

    // StampDetails component should not be in the document
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('applies correct styling to stamp buttons', () => {
    renderWithClient(<StampsScreen />);

    // Test the first stamp button's styling
    const stampButton = screen.getByTestId(`stamp-button-${mockParks[0].abbreviation}`);
    expect(stampButton).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
  });
});
