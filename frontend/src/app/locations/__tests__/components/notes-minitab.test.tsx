import { render, screen, fireEvent } from '@testing-library/react';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import { toast } from "react-toastify";

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
	const mockGetNote = jest.fn();
	const mockSetNote = jest.fn();
	const mockAbbreviation = 'TEST';

	beforeEach(() => {
		// Reset mocks
		jest.clearAllMocks();

		// Mock implementation
		mockedUseParkNotesStore.mockReturnValue({
			getNote: mockGetNote,
			setNote: mockSetNote
		});

		// Default mock values
		mockGetNote.mockReturnValue('Existing note');
	});

	it('renders textarea with existing note', () => {
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');

		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveValue('Existing note');
		expect(mockGetNote).toHaveBeenCalledWith(mockAbbreviation);
	});

	it('renders save button', () => {
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const saveButton = screen.getByText('Save');
		expect(saveButton).toBeInTheDocument();
	});

	it('updates note when typing in textarea', () => {
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');

		fireEvent.change(textarea, { target: { value: 'New note content' } });

		expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, 'New note content');
	});

	it('shows placeholder text when textarea is empty', () => {
		mockGetNote.mockReturnValue('');
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveAttribute('placeholder', 'Add some personal notes about this park!');
	});

	it('shows alert when save button is clicked', async () => {
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);

		const saveButton = screen.getByText('Save');
		const clickableArea = saveButton.parentElement;
		expect(clickableArea).toBeInTheDocument();
		if (clickableArea) {
			fireEvent.click(clickableArea);
		}

		expect(toast.success).toHaveBeenCalledWith("Notes saved!");
	});

	it('applies correct styling to textarea', () => {
		render(<NotesMiniTab abbreviation={mockAbbreviation} />);
		const textarea = screen.getByRole('textbox');

		expect(textarea).toHaveClass(
			'h-72',
			'w-full',
			'flex-grow',
			'resize-none',
			'border',
			'border-secondary_darkteal',
			'p-4'
		);
	});
}); 