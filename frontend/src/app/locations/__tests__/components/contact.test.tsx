import { LocationContact } from '@/app/locations/components/location-contact';
import { api } from '@/lib/mock/api';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AchievementsView from '../../components/achievements-view';
describe('LocationContact', () => {
  const park = api.getParks()[0];
  const parkActivity = api.getParkActivity()[0];

  it('renders park name', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    expect(screen.getByText(park.parkName)).toBeInTheDocument();
  });

  it('renders GPS coordinates', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    expect(screen.getByText(`GPS: ${park.coordinates.latitude}, ${park.coordinates.longitude}`)).toBeInTheDocument();
  });

  it('renders phone number', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    expect(screen.getByText(park.phone)).toBeInTheDocument();
  });

  it('renders email', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    if (park.email) {
      expect(screen.getByText(park.email)).toBeInTheDocument();
    }
  });

  it('renders address when provided', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    if (park.addresses?.[0]) {
      const addressText = screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' &&
          content.includes(park.addresses[0].addressLineOne) &&
          content.includes(park.addresses[0].city) &&
          content.includes(park.addresses[0].state) &&
          content.includes(park.addresses[0].zipcode.toString())
        );
      });
      expect(addressText).toBeInTheDocument();
    }
  });

  it('renders contact icons', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThanOrEqual(1);
  });

  it ('renders achievements', () => {
    render(<LocationContact park={park} parkActivity={parkActivity} />);
    const stampElement = screen.getByText('Stamp collected Yesterday');
    expect(stampElement).toBeInTheDocument();
    expect(screen.queryAllByTestId('BLI').length).toBe(0);
  });

  it('shows correct stamp text', () => {
    const parkActivityNew = parkActivity;
    parkActivityNew.stampCollectedAt = null!;
    render(<AchievementsView park={park} parkActivity={parkActivityNew} />);
    const stampElement = screen.getByText('Stamp not yet collected');
    expect(stampElement).toBeInTheDocument();
    parkActivityNew.stampCollectedAt = '';
    render(<AchievementsView park={park} parkActivity={parkActivityNew} />);
    var stampElements = screen.getAllByText('Stamp not yet collected');
    const currentDate = new Date().toISOString();
    parkActivityNew.stampCollectedAt = currentDate;
    render(<AchievementsView park={park} parkActivity={parkActivityNew} />);
    stampElements = screen.getAllByText('Stamp collected ' + currentDate);
    expect(stampElements.length).toEqual(1);
  });

  it('Renders bucket list items', () => {
    const parkNew = park;
    parkNew.bucketListItems.push({task: "Bucket"})
    const parkActivityNew = parkActivity;
    parkActivityNew.completedBucketListItems.push({id: 0});
    render(<AchievementsView park={parkNew} parkActivity={parkActivityNew} />);
    const stampElements = screen.getByTestId("BLI");
    expect(stampElements).toBeInTheDocument();
  });

  it('renders unchecked bucket list icon when required', () => {
    const parkNew = park;
    parkNew.bucketListItems.push({task: "Bucket"})
    const parkActivityNew = parkActivity;
    render(<AchievementsView park={parkNew} parkActivity={parkActivityNew} />);
    const stampElements = screen.getByTestId("BLI");
    expect(stampElements).toBeInTheDocument();
  });
});
