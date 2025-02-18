import { screen, fireEvent, waitFor } from '@testing-library/react';
import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import { useNote, useUpdateNote } from '@/hooks/queries/useNotes';
import { toast } from "react-toastify";
import { renderWithClient } from '@/lib/test-wrapper';

jest.mock('@/hooks/store/useParkNotesStore');
const mockedUseParkNotesStore = useParkNotesStore as jest.MockedFunction<typeof useParkNotesStore>;

jest.mock('@/hooks/queries/useNotes');
const mockedUseNote = useNote as jest.MockedFunction<typeof useNote>;
const mockedUseUpdateNote = useUpdateNote as jest.MockedFunction<typeof useUpdateNote>;

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
  const mockParkId = 1;
  const mockInitialNote = 'Initial test note';
  const mockSetNote = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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

    const errorCallback = mockMutate.mock.calls[0][1].onError;
    errorCallback();

    expect(toast.error).toHaveBeenCalledWith('Failed to save notes');
  });

  it('renders loading state when data is being fetched', () => {
    mockedUseNote.mockReturnValueOnce({
      data: null,
      isLoading: true,
    } as any);

    renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('updates local state when remote note changes', async () => {
    const newRemoteNote = 'New remote note';
    mockedUseNote.mockReturnValueOnce({
      data: { id: 1, note: newRemoteNote },
      isLoading: false,
    } as any);

    renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);

    await waitFor(() => {
      expect(mockSetNote).toHaveBeenCalledWith(mockAbbreviation, newRemoteNote);
    });
  });

  it('handles empty note correctly', async () => {
    mockedUseParkNotesStore.mockReturnValueOnce({
      getNote: () => '',
      setNote: mockSetNote,
    });

    renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
    const saveButton = screen.getByTestId('save-button');

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { parkId: mockParkId, note: '' },
        expect.anything()
      );
    });
  });

  it('displays placeholder text when note is empty', () => {
    mockedUseParkNotesStore.mockReturnValueOnce({
      getNote: () => '',
      setNote: mockSetNote,
    });

    renderWithClient(<NotesMiniTab abbreviation={mockAbbreviation} parkId={mockParkId} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Add some personal notes about this park!');
  });
});
