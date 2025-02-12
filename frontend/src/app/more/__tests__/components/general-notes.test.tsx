import { render, screen, fireEvent } from '@testing-library/react';
import { EditGeneralNotes } from '@/app/more/general-notes';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@/lib/a11y', () => ({
  a11yOnClick: jest.fn((handler) => ({ onClick: handler })),
}));

describe('EditGeneralNotes', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it('renders correctly with initial state', () => {
    localStorage.setItem('generalNotes', 'Initial notes');
    render(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial notes');

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  it('updates textarea value on user input', () => {
    render(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'New note content' } });

    expect(textarea).toHaveValue('New note content');
  });

  it('saves notes to localStorage and navigates on save', () => {
    render(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'Saved note content' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(localStorage.getItem('generalNotes')).toBe('Saved note content');
    expect(mockNavigate).toHaveBeenCalledWith('/more/my-notes');
  });

  it('handles localStorage errors gracefully', () => {
    // Simulate a localStorage error
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });
    console.error = jest.fn(); // Mock console.error to suppress error logs in test output

    render(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'Note that will fail' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(console.error).toHaveBeenCalledWith('Failed to save notes:', expect.any(Error));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
