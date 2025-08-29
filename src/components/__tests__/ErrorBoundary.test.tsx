import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { GlobalErrorBoundary } from '../ErrorBoundary/GlobalErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

describe('GlobalErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <GlobalErrorBoundary>
        <div>Test content</div>
      </GlobalErrorBoundary>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    );
    
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/i)).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('shows error details in development mode', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock import.meta.env.DEV
    vi.stubEnv('DEV', true);
    
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    );
    
    expect(screen.getByText(/Test error message/)).toBeInTheDocument();
    
    vi.unstubAllEnvs();
    consoleSpy.mockRestore();
  });

  it('renders Try Again and Go to Home buttons when error occurs', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    );
    
    // Check error message is displayed
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    
    // Check both buttons are present
    const tryAgainButton = screen.getByRole('button', { name: /Try Again/i });
    const goHomeButton = screen.getByRole('button', { name: /Go to Home/i });
    
    expect(tryAgainButton).toBeInTheDocument();
    expect(goHomeButton).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});