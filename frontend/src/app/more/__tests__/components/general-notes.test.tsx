import { EditGeneralNotes } from '@/app/more/general-notes';
import { useNote } from '@/hooks/queries/useNotes';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv({ usingBrowserRouter: true });

// ADAM: gotta figure out how to get BrowserRouter working in tests
// skipping for now
describe('EditGeneralNotes', () => {
    it('matches snapshot', () => {
        const { container } = render(<EditGeneralNotes />);
        expect(container).toMatchSnapshot();
    });

    it('renders correctly with initial state', async () => {
        render(<EditGeneralNotes />);

        const textarea = screen.getByPlaceholderText('Add some general notes!');
        expect(textarea).toBeInTheDocument();

        const saveButton = screen.getByText('Save');
        expect(saveButton).toBeInTheDocument();
    });

    it('updates textarea value on user input', async () => {
        const { wrapper } = renderWithClient(<EditGeneralNotes />);
        const { result } = renderHook(() => useNote(0), { wrapper });
        await waitFor(() => {
            expect(result.current.data).toBeDefined();
        });
        console.log(result.current.data);
        screen.debug();

        const textarea = screen.getByPlaceholderText('Add some general notes!');
        fireEvent.change(textarea, { target: { value: 'New note content' } });

        expect(textarea).toHaveValue('New note content');
    });

    it('saves notes to tanstack query', async () => {
        const { wrapper } = renderWithClient(<EditGeneralNotes />);
        const { result } = renderHook(() => useNote(0), { wrapper });

        await waitFor(() => {
            expect(result.current.isFetched).toBe(true);
        });
        console.log(result.current.data);
        screen.debug();

        // type in the textarea
        const textarea = screen.getByPlaceholderText('Add some general notes!');
        fireEvent.change(textarea, { target: { value: 'Saved note content' } });

        // click the save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // TODO: this is tricky
        // check that the note was updated in the hook
        // const { result: result2 } = renderHook(() => useNote(0), { wrapper });
        // await waitFor(() => {
        //     expect(result2.current.isFetching).toBe(false);
        //     expect(result2.current.data).toBeDefined();
        // });
        // console.log('result2');
        // console.log(result2.current.data);
        // expect(result2.current.data?.note).toBe('Saved note content');
    });
});
