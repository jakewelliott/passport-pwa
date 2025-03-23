import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { describe, expect, it, vi } from 'vitest';

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
	const mockAbbreviation = 'ENRI';
	const mockParkId = 1;
	const mockInitialNote = 'Initial test note';
	const mockSetNote = vi.fn();
	const mockMutate = vi.fn();



	it('renders the notes textarea with initial value', () => {
		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		const textarea = screen.getAllByPlaceholderText('Add some personal notes about this park!');
		expect(textarea).toHaveValue(mockInitialNote);
	});

	it('updates note on textarea change', async () => {
		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		const textarea = screen.getByRole('textbox');
		const newNote = 'Updated test note';

		fireEvent.change(textarea, { target: { value: newNote } });

		await waitFor(() => {
			expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, newNote);
			expect(mockMutate).toHaveBeenCalledWith({ parkId: mockParkId, note: newNote });
		});
	});

	it('shows success toast when note is saved', async () => {
		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		const saveButton = screen.getByTestId('save-button');

		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledWith(
				{ parkId: mockParkId, note: mockInitialNote },
				expect.objectContaining({
					onSuccess: expect.any(Function),
					onError: expect.any(Function),
				}),
			);
		});

		// Simulate successful save
		const successCallback = mockMutate.mock.calls[0][1].onSuccess;
		successCallback();

		expect(toast.success).toHaveBeenCalledWith('Notes saved!');
	});

	it('shows error toast when note save fails', async () => {
		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
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

	it('displays loading state when data is being fetched', () => {
		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('synchronizes local note with remote note when remote note differs', () => {

		const remoteNote = 'Remote note';

		renderWithClient(<NotesMiniTab parkId={mockParkId} />);

		expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, remoteNote);
	});

	it('does not synchronize when remote note matches local note', () => {

		renderWithClient(<NotesMiniTab parkId={mockParkId} />);

		expect(mockSetNote).not.toHaveBeenCalled();
	});

	it('handles null remote note gracefully', () => {

		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		expect(mockSetNote).not.toHaveBeenCalled();
	});

	it('handles empty local note when saving', async () => {

		renderWithClient(<NotesMiniTab parkId={mockParkId} />);
		const saveButton = screen.getByTestId('save-button');

		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledWith({ parkId: mockParkId, note: '' }, expect.any(Object));
		});
	});
});
