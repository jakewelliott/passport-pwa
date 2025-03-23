import { MyNotes } from '@/app/more/my-notes';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('MyNotes Component - User Stories', () => {
  const mockParks = [
    {
      parkName: 'Test Park 1',
      abbreviation: 'TP1',
      addresses: [{ city: 'Test City 1' }],
    },
    {
      parkName: 'Test Park 2',
      abbreviation: 'TP2',
      addresses: [{ city: 'Test City 2' }],
    },
  ];

  const mockNotes = {
    generalNotes: 'Some general notes',
    TP1: 'Notes for Test Park 1',
    getNote: (key: string) => mockNotes[key as keyof typeof mockNotes],
    getKeys: () => ['generalNotes', 'TP1'],
  };

  // User Story: As a user, I want to see my general notes
  it('should display general notes section', () => {
    renderWithClient(<MyNotes />);

    expect(screen.getByText('General Notes')).toBeInTheDocument();
    expect(screen.getByText('Some general notes')).toBeInTheDocument();
  });

  // User Story: As a user, I want to see which parks I have notes for
  it('should display parks with notes', () => {
    renderWithClient(<MyNotes />);

    expect(screen.getByText('Test Park 1')).toBeInTheDocument();
    expect(screen.getByText('Test City 1')).toBeInTheDocument();
    expect(screen.getByText('Notes for Test Park 1')).toBeInTheDocument();
  });

  // User Story: As a user, I want to see a message when I have no park notes
  it('should display message when no park notes exist', () => {
    renderWithClient(<MyNotes />);

    expect(screen.getByText('No park notes found.')).toBeInTheDocument();
  });

  // User Story: As a user, I want to see a message when I have no general notes
  it('should display placeholder when no general notes exist', () => {
    renderWithClient(<MyNotes />);

    expect(screen.getByText('No general notes yet')).toBeInTheDocument();
  });

  // User Story: As a user, I want to see when my notes were last updated
  it('should display last updated information', () => {
    renderWithClient(<MyNotes />);

    const lastUpdatedTexts = screen.getAllByText('Last updated: Not available');
    expect(lastUpdatedTexts.length).toBeGreaterThan(0);
  });

  // Test when parks data is null or undefined
  it('should handle null parks data', () => {
    renderWithClient(<MyNotes />);
    expect(screen.getByText('No park notes found.')).toBeInTheDocument();
  });

  // Test when there are parks but no notes for any of them
  it('should show no park notes when parks exist but have no notes', () => {
    renderWithClient(<MyNotes />);
    expect(screen.getByText('No park notes found.')).toBeInTheDocument();
  });

  // Test when there are multiple parks with notes
  it('should display multiple parks with notes', () => {
    const multipleParks = [
      ...mockParks,
      { parkName: 'Test Park 3', abbreviation: 'TP3', addresses: [{ city: 'Test City 3' }] },
    ];
    const multipleNotes = {
      ...mockNotes,
      TP2: 'Notes for Test Park 2',
      TP3: 'Notes for Test Park 3',
      getKeys: () => ['generalNotes', 'TP1', 'TP2', 'TP3'],
    };
    renderWithClient(<MyNotes />);
    expect(screen.getByText('Test Park 1')).toBeInTheDocument();
    expect(screen.getByText('Test Park 2')).toBeInTheDocument();
    expect(screen.getByText('Test Park 3')).toBeInTheDocument();
  });

  // Test when a park has no city in its address
  it('should handle parks with no city in address', () => {
    const parkWithNoCity = [{ parkName: 'No City Park', abbreviation: 'NCP', addresses: [{}] }];
    renderWithClient(<MyNotes />);
    expect(screen.getByText('No City Park')).toBeInTheDocument();
    expect(screen.queryByText('Test City')).not.toBeInTheDocument();
  });

  // Test when a park has no addresses
  it('should handle parks with no addresses', () => {
    const parkWithNoAddress = [{ parkName: 'No Address Park', abbreviation: 'NAP', addresses: [] }];
    renderWithClient(<MyNotes />);
    expect(screen.getByText('No Address Park')).toBeInTheDocument();
  });
});
