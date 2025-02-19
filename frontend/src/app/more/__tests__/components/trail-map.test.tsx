import { TrailMap } from '@/app/more/components/trail-map';
import { render, screen } from '@testing-library/react';

describe('TrailMap', () => {
  it('renders the map image with correct attributes', () => {
    render(<TrailMap />);

    const mapImage = screen.getByAltText('NC State Map showing all trails');
    expect(mapImage).toBeInTheDocument();
    expect(mapImage).toHaveAttribute('src', '/PassportMap_TrailsOnly.svg');
  });

  it('renders all trail names with correct styling', () => {
    render(<TrailMap />);

    const trailsAndClasses = {
      'Dan River': 'text-trail_danriver',
      'Deep River': 'text-trail_deepriver',
      'East Coast Greenway': 'text-trail_eastcoastgreenway',
      Equine: 'text-trail_equine',
      'Fonta Flora': 'text-trail_fontaflora',
      'French Broad River': 'text-trail_frenchbroadriver',
      'Haw River': 'text-trail_hawriver',
      'Hickory Nut Gorge': 'text-trail_hickorynutgorge',
      'Mountains-to-Sea': 'text-trail_mountainstosea',
      'Northern Peaks': 'text-trail_northernpeaks',
      'Overmountain Victory': 'text-trail_overmountainvictory',
      'Roanoke River': 'text-trail_roanokeriver',
      'Wilderness Gateway': 'text-trail_wildernessgateway',
      'Yadkin River': 'text-trail_yadkinriver',
    };

    for (const [trailName, className] of Object.entries(trailsAndClasses)) {
      const trailElement = screen.getByText(trailName);
      expect(trailElement).toBeInTheDocument();
      expect(trailElement).toHaveClass(className);
    }
  });

  it('has correct layout structure', () => {
    render(<TrailMap />);

    const container = screen.getByAltText('NC State Map showing all trails').closest('div');
    const legendContainer = screen.getByText('Dan River').closest('div')?.parentElement;

    expect(container).toHaveClass('flex', 'flex-col');
    expect(legendContainer).toHaveClass('ml-2', 'flex', 'w-full', 'justify-around');
  });

  it('splits trail names into two columns', () => {
    render(<TrailMap />);

    const firstColumnTrails = [
      'Dan River',
      'Deep River',
      'East Coast Greenway',
      'Equine',
      'Fonta Flora',
      'French Broad River',
      'Haw River',
    ];
    const secondColumnTrails = [
      'Hickory Nut Gorge',
      'Mountains-to-Sea',
      'Northern Peaks',
      'Overmountain Victory',
      'Roanoke River',
      'Wilderness Gateway',
      'Yadkin River',
    ];

    const firstColumn = screen.getByText('Dan River').closest('div');
    const secondColumn = screen.getByText('Hickory Nut Gorge').closest('div');

    for (const trail of firstColumnTrails) {
      expect(firstColumn).toContainElement(screen.getByText(trail));
    }

    for (const trail of secondColumnTrails) {
      expect(secondColumn).toContainElement(screen.getByText(trail));
    }
  });
});
