import { SuperAdminButton } from '@/app/auth/components/superadmin-button';
import * as debug from '@/lib/debug';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('SuperAdmin Button', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders the button', () => {
		renderWithClient(<SuperAdminButton />);
		expect(screen.getByText('SUPERADMIN')).toBeInTheDocument();
	});

	it('does not render in production', () => {
		vi.spyOn(debug, 'PRODUCTION', 'get').mockReturnValue(true);
		renderWithClient(<SuperAdminButton />);
		expect(screen.queryByText('SUPERADMIN')).not.toBeInTheDocument();
	});
});
