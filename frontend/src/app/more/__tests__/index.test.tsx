import More from '@/app/more/index';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('More Page', () => {
  it('renders all links correctly', () => {
    renderWithClient(<More />);

    // Check for all links
    const links = [
      { text: 'Trails', href: '/more/trails' },
      { text: 'Bucket List', href: '/more/bucket-list' },
      { text: 'My Notes', href: '/more/my-notes' },
      { text: 'Welcome Message', href: '/more/welcome-message' },
      { text: 'Staying Safe', href: '/more/staying-safe' },
      { text: 'Hiking Essentials', href: '/more/hiking-essentials' },
      { text: 'Icon Legend', href: '/more/icon-legend' },
      { text: 'App Info', href: '/more/app-info' },
    ];

    for (const { text, href } of links) {
      const linkElement = screen.getByText(text).closest('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    }
  });

  // TOOD: we need to get rid of user store
  // it("displays the logged-in user's username", () => {
  // 	renderWithClient(<More />);
  // 	expect(screen.getByText("You are currently logged in as 'testUser'")).toBeInTheDocument();
  // });
});
