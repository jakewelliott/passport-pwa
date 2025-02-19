import { HikingEssentials } from '@/app/more/hiking-essentials';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
describe('HikingEssentials Component - User Stories', () => {
  // User Story: As a user, I want to learn about essential hiking gear
  it('should display essential hiking gear information', () => {
    render(
      <BrowserRouter>
        <HikingEssentials />
      </BrowserRouter>,
    );

    expect(screen.getByText('WHAT TO PACK FOR A HIKE')).toBeInTheDocument();
    expect(screen.getByText('HIKING BOOTS')).toBeInTheDocument();
    expect(screen.getByText(/boots are broken in/i)).toBeInTheDocument();
  });

  // User Story: As a user, I want to know what to bring for hydration and nutrition
  it('should provide information about water and food', () => {
    render(
      <BrowserRouter>
        <HikingEssentials />
      </BrowserRouter>,
    );

    expect(screen.getByText('WATER')).toBeInTheDocument();
    expect(screen.getByText('SNACKS')).toBeInTheDocument();
    expect(screen.getByText(/1 liter of water per every 4-5 miles/i)).toBeInTheDocument();
  });

  // User Story: As a user, I want to learn about navigation tools
  it('should display navigation tool information', () => {
    render(
      <BrowserRouter>
        <HikingEssentials />
      </BrowserRouter>,
    );

    expect(screen.getByText('MAP & COMPASS')).toBeInTheDocument();
    expect(screen.getByText(/park map/i)).toBeInTheDocument();
    expect(screen.getByText(/visitor center/i)).toBeInTheDocument();
  });

  // User Story: As a user, I want to know about weather protection
  it('should provide weather protection information', () => {
    render(
      <BrowserRouter>
        <HikingEssentials />
      </BrowserRouter>,
    );

    expect(screen.getByText(/avoid wearing cotton/i)).toBeInTheDocument();
    expect(screen.getByText(/waterproof matches/i)).toBeInTheDocument();
  });

  // User Story: As a user, I want to learn about trail safety
  it('should provide trail safety information', () => {
    render(
      <BrowserRouter>
        <HikingEssentials />
      </BrowserRouter>,
    );

    expect(screen.getByText(/prevent blisters/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't forget water for your pet/i)).toBeInTheDocument();
  });
});
