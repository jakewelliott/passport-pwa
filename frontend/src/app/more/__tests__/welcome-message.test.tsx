import WelcomeMessage from '@/app/more/welcome-message';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WelcomeMessage Component', () => {
  it('renders the title correctly', () => {
    render(<WelcomeMessage />);

    const title = screen.getByText('WELCOME!');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('break-words', 'text-center', 'text-main_green');
  });

  it('renders all paragraphs correctly', () => {
    render(<WelcomeMessage />);

    const paragraphs = [
      "Since 1916, North Carolina's state parks have grown a lot. Now they cover over a 260,000 acres and offer tons of things to do and see. There's something for everyone!",
      'You can find all sorts of landscapes, from tall forests to calm lakes and winding rivers. Plus, there are miles of trails for hiking, mountain biking, and horseback riding. You can also paddle through water routes, enjoy picnics in beautiful spots, and spend a night under the stars.',
      "These parks are perfect for taking a break, connecting with nature, and feeling refreshed. You'll discover amazing places that show how we fit into the natural world. There are also exhibits and programs to learn more about North Carolina's wonders.",
      "We challenge you to visit as many of these amazing places as you can. Come join us to explore and learn about North Carolina's awesome natural and cultural treasures. We hope this program inspires you to create unforgettable memories and capture keepsakes of your adventures.",
    ];

    for (const text of paragraphs) {
      const paragraph = screen.getByText(text);
      expect(paragraph).toBeInTheDocument();
    }
  });

  it('renders all images with correct attributes', () => {
    render(<WelcomeMessage />);

    const images = [
      {
        src: '/photos/ELKN_ParkVisitor_LauraMeeks.jpg',
        alt: 'Elk Knob State Park Scene',
      },
      {
        src: '/photos/MOJESign_ParkVisitor_EverettFamily.jpg',
        alt: 'Mount Jefferson State Natural Area Scene',
      },
      {
        src: '/photos/DogWithPassport_ParkVisitor_KatieGriswold.jpg',
        alt: 'Dog with paper Passport',
      },
    ];

    for (const { src, alt } of images) {
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', src);
      expect(image).toHaveClass('aspect-square', 'w-full', 'rounded-lg', 'object-cover', 'shadow-md');
    }
  });

  it('renders the photo caption correctly', () => {
    render(<WelcomeMessage />);

    const caption = screen.getByText(
      'From left to right - photo courtesy of: Laura Meeks; The Everett Family; Katie Griswold',
    );
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveClass('p-mini');
    expect(caption).toHaveStyle({ marginTop: '12px' });
  });

  it('renders the layout structure correctly', () => {
    render(<WelcomeMessage />);

    // Check main container
    const mainContainer = screen.getByText('WELCOME!').closest('div');
    expect(mainContainer).toHaveClass('mx-auto', 'max-w-3xl', 'space-y-6', 'p-6');

    // Check image grid container
    const imageGrid = screen.getByTestId('image-grid');
    expect(imageGrid).toBeInTheDocument();
    expect(imageGrid).toHaveClass('mt-8', 'grid', 'grid-cols-3', 'place-items-center', 'gap-4');
  });
});
