import { IconSection } from '@/app/more/components/icon-section';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('IconSection', () => {
    it('renders camping section correctly', () => {
        render(<IconSection sectionName='Camping' />);

        expect(screen.getByText('Camping')).toBeInTheDocument();
        expect(screen.getByText('Camper cabins')).toBeInTheDocument();
        expect(screen.getByText('RV hookup camping*')).toBeInTheDocument();
        expect(screen.getByText('Tent camping')).toBeInTheDocument();

        // Check for extra text
        expect(screen.getByText(/\*has electric, water, AND\/OR sewer hookups/)).toBeInTheDocument();
    });

    it('renders activities section correctly', () => {
        render(<IconSection sectionName='Activities' />);

        expect(screen.getByText('Activities')).toBeInTheDocument();
        expect(screen.getByText('Biking')).toBeInTheDocument();
        expect(screen.getByText('Hiking')).toBeInTheDocument();
        expect(screen.getByText('Swimming')).toBeInTheDocument();
    });

    it('renders amenities section correctly', () => {
        render(<IconSection sectionName='Amenities' />);

        expect(screen.getByText('Amenities')).toBeInTheDocument();
        expect(screen.getByText('Boat ramp')).toBeInTheDocument();
        expect(screen.getByText('Visitor center')).toBeInTheDocument();
    });

    it('renders state trail stamps section correctly', () => {
        render(<IconSection sectionName='State Trail Stamps' />);

        expect(screen.getByText('State Trail Stamps')).toBeInTheDocument();
        expect(screen.getByText('Mountains-to-Sea')).toBeInTheDocument();
        expect(screen.getByText('Fonta Flora')).toBeInTheDocument();
    });

    it('renders nothing for invalid section name', () => {
        const { container } = render(<IconSection sectionName='Invalid Section' />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders icons with correct attributes', () => {
        render(<IconSection sectionName='Camping' />);

        const icon = screen.getByAltText('Camper cabins');
        expect(icon).toHaveAttribute('src', '/icons/park/CamperCabins-Green.svg');
        expect(icon).toHaveAttribute('width', '36px');
        expect(icon).toHaveAttribute('height', '36px');
    });

    it('applies correct styling to section header', () => {
        render(<IconSection sectionName='Camping' />);

        const header = screen.getByText('Camping');
        expect(header).toHaveClass('pb-3', 'text-icon_camping');
    });
});
