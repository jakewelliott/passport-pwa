import * as usePageTitleHook from '@/hooks/usePageTitle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header, { BackButton } from '../header';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Add this helper function at the top level
const renderWithProviders = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>,
    );
};

// Update the mock setup
const mockUseUser = vi.fn();
vi.mock('@/hooks/queries/useUser', () => ({
    useUser: () => mockUseUser(),
}));

describe('Header', () => {
    const mockUsePageTitle = vi.spyOn(usePageTitleHook, 'usePageTitle');

    beforeEach(() => {
        mockNavigate.mockClear();
        mockUsePageTitle.mockClear();
        mockUseUser.mockReturnValue({ data: { id: 1, username: 'testuser', role: 'visitor' } });
    });

    it('hides back button at top level pages', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Stamps',
            showBackButton: false,
        });

        renderWithProviders(<Header />);

        expect(screen.queryByText('Back')).not.toBeInTheDocument();
        expect(screen.getByText('Stamps')).toBeInTheDocument();
    });

    it('shows back button on nested pages', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Park Details',
            showBackButton: true,
        });

        renderWithProviders(<Header />);

        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Park Details')).toBeInTheDocument();
    });

    it('navigates back when back button is clicked', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Park Details',
            showBackButton: true,
        });

        renderWithProviders(<Header />);

        const backButton = screen.getByText('Back').closest('button');
        if (!backButton) {
            throw new Error('Back button not found');
        }
        fireEvent.click(backButton);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('has correct styling', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Test Title',
            showBackButton: true,
        });

        renderWithProviders(<Header />);

        const header = screen.getByRole('banner');
        const expectedClasses = ['relative', 'flex', 'items-center', 'justify-center', 'bg-secondary_darkteal', 'p-4'];
        for (const className of expectedClasses) {
            expect(header).toHaveClass(className);
        }
        expect(header).toHaveStyle({ height: '50px' });

        const title = screen.getByText('Test Title');
        expect(title).toHaveClass('text-system_white');
    });

    it('renders the correct page title', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Custom Page Title',
            showBackButton: false,
        });

        renderWithProviders(<Header />);

        expect(screen.getByText('Custom Page Title')).toBeInTheDocument();
    });

    it('renders a placeholder for balance', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Test',
            showBackButton: false,
        });

        renderWithProviders(<Header />);

        const balancePlaceholder = screen.getByTestId('balance-placeholder');
        expect(balancePlaceholder).toBeInTheDocument();
        expect(balancePlaceholder).toHaveClass('absolute right-4 w-[70px]');
    });

    it('renders BackButton component when showBackButton is true', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Test',
            showBackButton: true,
        });

        renderWithProviders(<Header />);

        const backButton = screen.getByRole('button', { name: /back/i });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveClass('flex items-center text-system_white');
    });

    it('does not render BackButton component when showBackButton is false', () => {
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Test',
            showBackButton: false,
        });

        renderWithProviders(<Header />);

        const backButton = screen.queryByRole('button', { name: /back/i });
        expect(backButton).not.toBeInTheDocument();
    });

    it('does not render when user data is null', () => {
        mockUseUser.mockReturnValue({ data: null });
        mockUsePageTitle.mockReturnValue({
            pageTitle: 'Test',
            showBackButton: false,
        });

        renderWithProviders(<Header />);
        expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });
});

describe('BackButton', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders nothing when hidden prop is true', () => {
        renderWithProviders(<BackButton hidden={true} />);

        const backButton = screen.queryByRole('button', { name: /back/i });
        expect(backButton).not.toBeInTheDocument();
    });

    it('renders back button with correct icon and text', () => {
        renderWithProviders(<BackButton hidden={false} />);

        const backButton = screen.getByRole('button', { name: /back/i });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toContainElement(screen.getByTestId('fa-chevron-left'));
        expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('navigates back when clicked', () => {
        renderWithProviders(<BackButton hidden={false} />);

        const backButton = screen.getByRole('button', { name: /back/i });
        fireEvent.click(backButton);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
