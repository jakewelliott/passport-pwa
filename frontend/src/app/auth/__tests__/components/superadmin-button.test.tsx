import { SuperAdminButton } from '@/app/auth/components/superadmin-button';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SuperAdmin Button', () => {
	it('renders the button', () => {
		renderWithClient(<SuperAdminButton />);
		expect(screen.getByText('SUPERADMIN')).toBeInTheDocument();
	});
});