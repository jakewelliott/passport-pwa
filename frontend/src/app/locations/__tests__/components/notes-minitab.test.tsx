import { screen, fireEvent } from '@testing-library/react';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import { toast } from "react-toastify";
import { renderWithClient } from '@/lib/test-wrapper';

// Mock the store
jest.mock('@/hooks/store/useParkNotesStore');
const mockedUseParkNotesStore = useParkNotesStore as unknown as jest.Mock;

// Mock react-toastify
jest.mock("react-toastify", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
		info: jest.fn(),
		warning: jest.fn(),
	},
}));

describe('NotesMiniTab', () => {
	const mockAbbreviation = 'ENRI';
	const mockInitialNote = 'Initial test note';
	const mockSetNote = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseParkNotesStore.mockReturnValue({
			getNote: () => mockInitialNote,
			setNote: mockSetNote,
		});
	});

	it('renders the notes textarea with initial value', () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveValue(mockInitialNote);
	});

	it('updates note on textarea change', () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');
		const newNote = 'Updated test note';

		fireEvent.change(textarea, { target: { value: newNote } });
		expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, newNote);
	});

	it('shows success toast when note is saved', () => {
		renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');
		const newNote = 'Updated test note';

		fireEvent.change(textarea, { target: { value: newNote } });
		fireEvent.click(screen.getByTestId('save-button'));
		expect(toast.success).toHaveBeenCalledWith('Notes saved!');
	});
}); 