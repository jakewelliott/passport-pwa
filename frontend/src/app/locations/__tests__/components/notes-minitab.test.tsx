import { NotesMiniTab } from '@/app/locations/components/notes-minitab';
import { useNotes } from '@/hooks/queries/useNotes';
import { mockPark } from '@/lib/testing/mock';
import { mockToast, setupTestEnv } from '@/lib/testing/test-wrapper';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { beforeAll, describe, expect, it } from 'vitest';

mockToast();
// TODO: figure out how to get browser router working
// going to fix rest of the tests for now
const { render, checkHook } = setupTestEnv({ usingBrowserRouter: true });

describe('NotesMiniTab', () => {
    beforeAll(async () => {
        await checkHook(useNotes, 'useNotes');
    });

    it('matches snapshot', () => {
        const { container } = render(<NotesMiniTab parkId={mockPark.id} />);
        expect(container).toMatchSnapshot();
    });

    it('renders the notes textarea with placeholder value', () => {
        render(<NotesMiniTab parkId={mockPark.id} />);
        expect(screen.getByPlaceholderText('Add some personal notes about this park!')).toBeInTheDocument();
    });

    it('shows success toast when note is saved', async () => {
        render(<NotesMiniTab parkId={mockPark.id} />);
        const saveButton = screen.getByTestId('save-button');
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalled();
        });
    });
});
