import { EditGeneralNotes } from '@/app/more/general-notes';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { renderWithClient } from '@/lib/test-wrapper';
// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/lib/a11y', () => ({
  a11yOnClick: vi.fn((handler) => ({ onClick: handler })),
}));

describe('EditGeneralNotes', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it('renders correctly with initial state', () => {
    localStorage.setItem('generalNotes', 'Initial notes');
    renderWithClient(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial notes');

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  it('updates textarea value on user input', () => {
    renderWithClient(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'New note content' } });

    expect(textarea).toHaveValue('New note content');
  });

  it('saves notes to localStorage and navigates on save', () => {
    renderWithClient(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'Saved note content' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(localStorage.getItem('generalNotes')).toBe('Saved note content');
    expect(mockNavigate).toHaveBeenCalledWith('/more/my-notes');
  });

  it('handles localStorage errors gracefully', () => {
    // Simulate a localStorage error
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithClient(<EditGeneralNotes />);

    const textarea = screen.getByPlaceholderText('Add some general notes!');
    fireEvent.change(textarea, { target: { value: 'Note that will fail' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(console.error).toHaveBeenCalledWith('Failed to save notes:', expect.any(Error));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
