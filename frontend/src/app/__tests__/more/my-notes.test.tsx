import { render, screen, } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MyNotes } from '@/app/more/my-notes';
import { useParks } from '@/hooks/queries/useParks';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';

// Mock the hooks and router
jest.mock('@/hooks/queries/useParks');
jest.mock('@/hooks/store/useParkNotesStore');
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn()
}));

const mockUseParks = useParks as jest.Mock;
const mockUseParkNotesStore = useParkNotesStore as unknown as jest.Mock;

describe('MyNotes Component - User Stories', () => {
	const mockParks = [
		{
			name: 'Test Park 1',
			abbreviation: 'TP1',
			address: [{ city: 'Test City 1' }]
		},
		{
			name: 'Test Park 2',
			abbreviation: 'TP2',
			address: [{ city: 'Test City 2' }]
		}
	];

	const mockNotes = {
		generalNotes: 'Some general notes',
		TP1: 'Notes for Test Park 1',
		getNote: (key: string) => mockNotes[key as keyof typeof mockNotes],
		getKeys: () => ['generalNotes', 'TP1']
	};

	beforeEach(() => {
		mockUseParks.mockReturnValue({ data: mockParks });
		mockUseParkNotesStore.mockReturnValue(mockNotes);
	});

	// User Story: As a user, I want to see my general notes
	it('should display general notes section', () => {
		render(
			<BrowserRouter>
				<MyNotes />
			</BrowserRouter>
		);

		expect(screen.getByText('General Notes')).toBeInTheDocument();
		expect(screen.getByText('Some general notes')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see which parks I have notes for
	it('should display parks with notes', () => {
		render(
			<BrowserRouter>
				<MyNotes />
			</BrowserRouter>
		);

		expect(screen.getByText('Test Park 1')).toBeInTheDocument();
		expect(screen.getByText('Test City 1')).toBeInTheDocument();
		expect(screen.getByText('Notes for Test Park 1')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see a message when I have no park notes
	it('should display message when no park notes exist', () => {
		mockUseParkNotesStore.mockReturnValue({
			...mockNotes,
			getKeys: () => ['generalNotes']
		});

		render(
			<BrowserRouter>
				<MyNotes />
			</BrowserRouter>
		);

		expect(screen.getByText('No park notes found.')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see a message when I have no general notes
	it('should display placeholder when no general notes exist', () => {
		mockUseParkNotesStore.mockReturnValue({
			...mockNotes,
			generalNotes: '',
			getNote: () => ''
		});

		render(
			<BrowserRouter>
				<MyNotes />
			</BrowserRouter>
		);

		expect(screen.getByText('No general notes yet')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see when my notes were last updated
	it('should display last updated information', () => {
		render(
			<BrowserRouter>
				<MyNotes />
			</BrowserRouter>
		);

		const lastUpdatedTexts = screen.getAllByText('Last updated: Not available');
		expect(lastUpdatedTexts.length).toBeGreaterThan(0);
	});
}); 