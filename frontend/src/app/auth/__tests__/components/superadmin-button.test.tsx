import { SuperAdminButton } from '@/app/auth/components/superadmin-button';
import { renderWithClient } from '@/lib/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import * as debug from '@/lib/debug';

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
