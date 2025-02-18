import { render, screen } from '@testing-library/react';
import { AdminPage } from '../index';
import * as debugModule from '@/lib/debug';

// Mock the debug module
jest.mock('@/lib/debug', () => ({
  dbg: jest.fn(),
}));

describe('AdminPage', () => {
  it('renders the welcome message', () => {
    render(<AdminPage />);
    const welcomeMessage = screen.getByText('Welcome to the Admin Page!!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('calls dbg function with correct parameters', () => {
    render(<AdminPage />);
    expect(debugModule.dbg).toHaveBeenCalledWith('RENDER', 'AdminPage');
  });

  it('renders a div element', () => {
    render(<AdminPage />);
    const divElement = screen.getByText('Welcome to the Admin Page!!');
    expect(divElement.tagName).toBe('DIV');
  });

  it('renders only one element', () => {
    const { container } = render(<AdminPage />);
    expect(container.childElementCount).toBe(1);
  });
});
