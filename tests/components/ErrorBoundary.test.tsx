import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// Suppress console.error for cleaner test output
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalError;
});

// Component that throws an error
function ThrowingComponent({ error }: { error: Error }) {
  throw error;
}

// Component that doesn't throw
function SafeComponent({ text }: { text: string }) {
  return <div data-testid="safe-content">{text}</div>;
}

describe('ErrorBoundary', () => {
  /**
   * Property 9: Error Boundary Catch
   * For any error thrown within an Error_Boundary's children, THE Error_Boundary SHALL catch it and render fallback UI.
   * Validates: Requirements 5.1
   */
  describe('Property 9: Error Boundary Catch', () => {
    it('should catch any error and render fallback UI', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (errorMessage) => {
            const error = new Error(errorMessage);

            const { container } = render(
              <ErrorBoundary>
                <ThrowingComponent error={error} />
              </ErrorBoundary>
            );

            // Should render fallback UI, not crash
            expect(container.innerHTML).not.toBe('');
            
            // Should show error message
            expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
            
            // Should show retry button
            expect(screen.getByRole('button', { name: /попробовать снова/i })).toBeInTheDocument();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should render children when no error occurs', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (text) => {
            render(
              <ErrorBoundary>
                <SafeComponent text={text} />
              </ErrorBoundary>
            );

            expect(screen.getByTestId('safe-content')).toHaveTextContent(text);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use custom fallback when provided', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          fc.string({ minLength: 1, maxLength: 100 }),
          (errorMessage, fallbackText) => {
            const error = new Error(errorMessage);

            render(
              <ErrorBoundary fallback={<div data-testid="custom-fallback">{fallbackText}</div>}>
                <ThrowingComponent error={error} />
              </ErrorBoundary>
            );

            expect(screen.getByTestId('custom-fallback')).toHaveTextContent(fallbackText);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 10: Error Boundary Logging
   * For any error caught by Error_Boundary, THE Error_Boundary SHALL call console.error with error details.
   * Validates: Requirements 5.2
   */
  describe('Property 10: Error Boundary Logging', () => {
    it('should log error details when catching an error', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (errorMessage) => {
            const error = new Error(errorMessage);
            const consoleSpy = vi.spyOn(console, 'error');

            render(
              <ErrorBoundary>
                <ThrowingComponent error={error} />
              </ErrorBoundary>
            );

            // Should have called console.error
            expect(consoleSpy).toHaveBeenCalled();
            
            // Should include 'ErrorBoundary caught' in the log
            const calls = consoleSpy.mock.calls;
            const hasErrorBoundaryLog = calls.some(
              call => call.some(arg => 
                typeof arg === 'string' && arg.includes('ErrorBoundary caught')
              )
            );
            expect(hasErrorBoundaryLog).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should call onError callback when provided', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (errorMessage) => {
            const error = new Error(errorMessage);
            const onError = vi.fn();

            render(
              <ErrorBoundary onError={onError}>
                <ThrowingComponent error={error} />
              </ErrorBoundary>
            );

            expect(onError).toHaveBeenCalledWith(
              error,
              expect.objectContaining({
                componentStack: expect.any(String),
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Retry functionality', () => {
    it('should reset error state when retry is clicked', () => {
      let shouldThrow = true;
      
      function ConditionalThrow() {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div data-testid="recovered">Recovered!</div>;
      }

      render(
        <ErrorBoundary>
          <ConditionalThrow />
        </ErrorBoundary>
      );

      // Should show error state
      expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();

      // Fix the error condition
      shouldThrow = false;

      // Click retry
      fireEvent.click(screen.getByRole('button', { name: /попробовать снова/i }));

      // Should now show recovered content
      expect(screen.getByTestId('recovered')).toBeInTheDocument();
    });
  });
});
