import { MyNotes } from '@/app/more/my-notes';
import { useNotes } from '@/hooks/queries/useNotes';
import { useParks } from '@/hooks/queries/useParks';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('My Notes component', () => {
    beforeEach(async () => {
        const { wrapper } = renderWithClient(<MyNotes />);
        // we need to load useParks first then useNotes
        const { result: parks } = renderHook(() => useParks(), { wrapper });
        const { result: notes } = renderHook(() => useNotes(), { wrapper });
        await waitFor(() => {
            expect(notes.current.data).toBeDefined();
            expect(notes.current.isFetching).toBe(false);
            expect(parks.current.data).toBeDefined();
            expect(parks.current.isFetching).toBe(false);
        });
    });

    // User Story: As a user, I want to see my general notes
    it('should display general notes section', () => {
        screen.debug();
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
        renderWithClient(<MyNotes />);
        expect(screen.getByText('Test Park 1')).toBeInTheDocument();
        expect(screen.getByText('Test Park 2')).toBeInTheDocument();
        expect(screen.getByText('Test Park 3')).toBeInTheDocument();
    });
});
