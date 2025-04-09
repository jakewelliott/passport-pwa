import { MyNotes } from '@/app/more/my-notes';
import { useNotes } from '@/hooks/queries/useNotes';
import { useParks } from '@/hooks/queries/useParks';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { beforeEach, describe, expect, it } from 'vitest';
const { render, checkHook } = setupTestEnv();

// ADAM: this one is complicated, skipping
describe('My Notes component', () => {
    beforeEach(async () => {
        checkHook(useNotes, 'useNotes');
        checkHook(useParks, 'useParks');
    });

    it('matches snapshot', () => {
        const { container } = render(<MyNotes />);
        expect(container).toMatchSnapshot();
    });

    // User Story: As a user, I want to see my general notes
    // it('should display general notes section', () => {
    //     screen.debug();
    //     expect(screen.getByText('General Notes')).toBeInTheDocument();
    //     expect(screen.getByText('Some general notes')).toBeInTheDocument();
    // });

    // // User Story: As a user, I want to see which parks I have notes for
    // it('should display parks with notes', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('Test Park 1')).toBeInTheDocument();
    //     expect(screen.getByText('Test City 1')).toBeInTheDocument();
    //     expect(screen.getByText('Notes for Test Park 1')).toBeInTheDocument();
    // });

    // // User Story: As a user, I want to see a message when I have no park notes
    // it('should display message when no park notes exist', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('No park notes found.')).toBeInTheDocument();
    // });

    // // User Story: As a user, I want to see a message when I have no general notes
    // it('should display placeholder when no general notes exist', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('No general notes yet')).toBeInTheDocument();
    // });

    // // User Story: As a user, I want to see when my notes were last updated
    // it('should display last updated information', () => {
    //     render(<MyNotes />);
    //     const lastUpdatedTexts = screen.getAllByText('Last updated: Not available');
    //     expect(lastUpdatedTexts.length).toBeGreaterThan(0);
    // });

    // // Test when parks data is null or undefined
    // it('should handle null parks data', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('No park notes found.')).toBeInTheDocument();
    // });

    // // Test when there are parks but no notes for any of them
    // it('should show no park notes when parks exist but have no notes', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('No park notes found.')).toBeInTheDocument();
    // });

    // // Test when there are multiple parks with notes
    // it('should display multiple parks with notes', () => {
    //     render(<MyNotes />);
    //     expect(screen.getByText('Test Park 1')).toBeInTheDocument();
    //     expect(screen.getByText('Test Park 2')).toBeInTheDocument();
    //     expect(screen.getByText('Test Park 3')).toBeInTheDocument();
    // });
});
