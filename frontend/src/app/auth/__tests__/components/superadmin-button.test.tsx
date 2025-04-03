import { SuperAdminButton } from '@/app/auth/components/superadmin-button';
import * as debug from '@/lib/debug';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { render } = setupTestEnv();

describe('SuperAdmin Button', () => {
    it('matches snapshot', () => {
        const { container } = render(<SuperAdminButton />);
        expect(container).toMatchSnapshot();
    });

    it('renders the button', () => {
        render(<SuperAdminButton />);
        expect(screen.getByText('SUPERADMIN')).toBeInTheDocument();
    });

    it('does not render in production', () => {
        vi.spyOn(debug, 'PRODUCTION', 'get').mockReturnValue(true);
        render(<SuperAdminButton />);
        expect(screen.queryByText('SUPERADMIN')).not.toBeInTheDocument();
    });
});
