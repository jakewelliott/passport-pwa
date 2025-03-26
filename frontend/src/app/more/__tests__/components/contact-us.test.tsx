import { ContactUs } from '@/app/more/components/contact-us';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactUs', () => {
    it('renders the header correctly', () => {
        renderWithRouter(<ContactUs />);

        const header = screen.getByText('CONTACT US');
        expect(header).toBeInTheDocument();
        expect(header.parentElement).toHaveClass(
            'bg-supporting_inactiveblue',
            'p-2',
            'text-center',
            'text-system_white',
        );
    });

    it('renders the website link correctly', () => {
        renderWithRouter(<ContactUs />);

        const websiteLink = screen.getByText('www.ncparks.gov');
        expect(websiteLink).toBeInTheDocument();
        expect(websiteLink).toHaveClass('text-supporting_inactiveblue', 'no-underline');
        expect(websiteLink.closest('a')).toHaveAttribute('href', '/www.ncparks.gov');
    });

    it('renders social media links with correct attributes', () => {
        renderWithRouter(<ContactUs />);

        const socialLinks = {
            facebook: 'https://www.facebook.com/NorthCarolinaStateParks/',
            instagram: 'https://www.instagram.com/ncstateparks/',
            youtube: 'https://www.youtube.com/@parksNC',
        };

        const links = screen.getAllByRole('link');
        const socialMediaLinks = links.filter((link) =>
            Object.values(socialLinks).includes(link.getAttribute('href') || ''),
        );

        for (const link of socialMediaLinks) {
            expect(link).toBeInTheDocument();
            expect(link).toHaveClass(
                'flex',
                'h-8',
                'w-8',
                'items-center',
                'justify-center',
                'rounded-full',
                'bg-supporting_inactiveblue',
            );
        }
    });

    it('renders address information correctly', () => {
        renderWithRouter(<ContactUs />);

        const addressLines = [
            'NC Division of Parks and Recreation',
            'Dept. of Natural and Cultural Resources',
            '1615 Mail Service Center',
            'Raleigh, NC 27699',
            '(919) 707-9300',
        ];

        for (const line of addressLines) {
            expect(screen.getByText(line)).toBeInTheDocument();
        }
    });

    it('applies correct styling to container', () => {
        renderWithRouter(<ContactUs />);

        const outerContainer = screen.getByText('CONTACT US').closest('div')?.parentElement;
        expect(outerContainer).toHaveClass('p-4');

        const innerContainer = screen.getByText('www.ncparks.gov').closest('div')?.parentElement;
        expect(innerContainer).toHaveClass('space-y-2', 'bg-supporting_lightblue', 'p-2.5', 'text-center');
    });

    it('renders social media icons with correct styling', () => {
        renderWithRouter(<ContactUs />);

        const socialIconsContainer = screen.getByText('www.ncparks.gov').parentElement?.nextElementSibling;
        expect(socialIconsContainer).toHaveClass('flex', 'justify-center', 'gap-3');
    });
});
