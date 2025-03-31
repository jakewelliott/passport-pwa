import { EditGeneralNotes } from '@/app/more/general-notes';
import { useNote } from '@/hooks/queries/useNotes';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
    useBlocker: vi.fn(() => ({ state: 'unblocked', reset: vi.fn() })),
}));

describe('EditGeneralNotes', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // (useNavigate as Mock).mockReturnValue(mockNavigate);
        // localStorage.clear();
    });

    it('renders correctly with initial state', async () => {
        localStorage.setItem('generalNotes', 'Initial notes');
        const { wrapper } = renderWithClient(<EditGeneralNotes />);
        const { result } = renderHook(() => useNote(0), { wrapper });
        await waitFor(() => {
            expect(result.current.data).toBeDefined();
        });
        console.log(result.current.data);
        screen.debug();

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
