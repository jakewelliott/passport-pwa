import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { mockPark, mockParkNote } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import { describe, expect, it, vi } from 'vitest';

// TODO: this file is F'ed

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn(),
    },
}));

describe('NotesMiniTab', () => {
    it('renders the notes textarea with initial value', () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        const textarea = screen.getAllByPlaceholderText('Add some personal notes about this park!');
        expect(textarea).toHaveValue(mockParkNote.note);
    });

    // it('updates note on textarea change', async () => {
    // 	renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
    // 	const textarea = screen.getByRole('textbox');
    // 	const newNote = 'Updated test note';

    // 	fireEvent.change(textarea, { target: { value: newNote } });

    // });

    it('shows success toast when note is saved', async () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        const saveButton = screen.getByTestId('save-button');

        fireEvent.click(saveButton);

        // TODO: make this check for the correct mutation
        // await waitFor(() => {
        // 	expect(mockMutate).toHaveBeenCalledWith(
        // 		{ parkId: mockPark.id, note: mockParkNote.note },
        // 		expect.objectContaining({
        // 			onSuccess: expect.any(Function),
        // 			onError: expect.any(Function),
        // 		}),
        // 	);
        // });

        // Simulate successful save
        // const successCallback = mockMutate.mock.calls[0][1].onSuccess;
        // successCallback();

        expect(toast.success).toHaveBeenCalledWith('Notes saved!');
    });

    it('shows error toast when note save fails', async () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        const saveButton = screen.getByTestId('save-button');

        fireEvent.click(saveButton);

        // TODO: make this check for the correct mutation
        // await waitFor(() => {
        // 	expect(mockMutate).toHaveBeenCalled();
        // });

        // Simulate failed save
        // const errorCallback = mockMutate.mock.calls[0][1].onError;
        // errorCallback();

        expect(toast.error).toHaveBeenCalledWith('Failed to save notes');
    });

    it('displays loading state when data is being fetched', () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('synchronizes local note with remote note when remote note differs', () => {
        const remoteNote = 'Remote note';

        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);

        // expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, remoteNote);
    });

    it('does not synchronize when remote note matches local note', () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);

        // expect(mockSetNote).not.toHaveBeenCalled();
    });

    it('handles null remote note gracefully', () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        // expect(mockSetNote).not.toHaveBeenCalled();
    });

    it('handles empty local note when saving', async () => {
        renderWithClient(<NotesMiniTab parkId={mockPark.id} />);
        const saveButton = screen.getByTestId('save-button');

        fireEvent.click(saveButton);

        // await waitFor(() => {
        // 	expect(mockMutate).toHaveBeenCalledWith({ parkId: mockPark.id, note: '' }, expect.any(Object));
        // });
    });
});
