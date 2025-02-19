import { screen, fireEvent, waitFor } from '@testing-library/react';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import { useNote, useUpdateNote } from '@/hooks/queries/useNotes';
import { toast } from "react-toastify";
import { renderWithClient } from '@/lib/test-wrapper';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

// Mock the store
vi.mock('@/hooks/store/useParkNotesStore');
const mockedUseParkNotesStore = useParkNotesStore as Mock;

// Mock the query hooks
vi.mock('@/hooks/queries/useNotes');
const mockedUseNote = useNote as Mock;
const mockedUseUpdateNote = useUpdateNote as Mock;

// Mock react-toastify
vi.mock("react-toastify", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
		warning: vi.fn(),
	},
}));

describe('NotesMiniTab', () => {
	const mockAbbreviation = 'ENRI';
	const mockParkId = 1;
	const mockInitialNote = 'Initial test note';
	const mockSetNote = vi.fn();
	const mockMutate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockedUseParkNotesStore.mockReturnValue({
			getNote: () => mockInitialNote,
			setNote: mockSetNote,
		});
		mockedUseNote.mockReturnValue({
			data: { id: 1, note: mockInitialNote },
			isLoading: false,
		} as any);
		mockedUseUpdateNote.mockReturnValue({
			mutate: mockMutate,
		} as any);
	});

	it('renders the notes textarea with initial value', () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveValue(mockInitialNote);
	});

	it('updates note on textarea change', async () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
		const textarea = screen.getByRole('textbox');
		const newNote = 'Updated test note';

		fireEvent.change(textarea, { target: { value: newNote } });

		await waitFor(() => {
			expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, newNote);
			expect(mockMutate).toHaveBeenCalledWith({ parkId: mockParkId, note: newNote });
		});
	});

	it('shows success toast when note is saved', async () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
		const saveButton = screen.getByTestId('save-button');

		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledWith(
				{ parkId: mockParkId, note: mockInitialNote },
				expect.objectContaining({
					onSuccess: expect.any(Function),
					onError: expect.any(Function),
				})
			);
		});

		// Simulate successful save
		const successCallback = mockMutate.mock.calls[0][1].onSuccess;
		successCallback();

		expect(toast.success).toHaveBeenCalledWith('Notes saved!');
	});

	it('shows error toast when note save fails', async () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
		const saveButton = screen.getByTestId('save-button');

		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalled();
		});

		// Simulate failed save
		const errorCallback = mockMutate.mock.calls[0][1].onError;
		errorCallback();

		expect(toast.error).toHaveBeenCalledWith('Failed to save notes');
	});
});
