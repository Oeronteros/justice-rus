import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuideForm } from '@/components/forms/GuideForm';
import { guideCategories } from '@/lib/schemas/guide';

// Mock markdownToHtml
vi.mock('@/lib/markdown', () => ({
  markdownToHtml: (content: string) => `<p>${content}</p>`,
}));

describe('GuideForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSubmit.mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 6: Form Validation on Submit
   * For any form submission, THE Form_Manager SHALL validate all fields against the Zod schema before calling onSubmit.
   * Validates: Requirements 4.2
   */
  describe('Property 6: Form Validation on Submit', () => {
    it('should not call onSubmit with invalid data', async () => {
      // Generate invalid data (empty title or content)
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.constantFrom('', '   ', '\t\n'), // Invalid titles
            content: fc.string({ minLength: 10, maxLength: 100 }),
            category: fc.constantFrom(...guideCategories),
            author: fc.string({ maxLength: 50 }),
          }),
          async ({ title, content, category, author }) => {
            cleanup();
            
            render(
              <GuideForm
                onSubmit={mockOnSubmit}
                onCancel={mockOnCancel}
                defaultAuthor={author}
              />
            );

            // Fill form with invalid title
            const titleInput = screen.getByPlaceholderText(/название гайда/i);
            const contentInput = screen.getByPlaceholderText(/пиши здесь/i);
            
            await userEvent.clear(titleInput);
            await userEvent.type(titleInput, title);
            await userEvent.type(contentInput, content);

            // Try to submit
            const submitButton = screen.getByRole('button', { name: /опубликовать/i });
            fireEvent.click(submitButton);

            // onSubmit should not be called with invalid data
            await waitFor(() => {
              expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            
            cleanup();
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should call onSubmit with valid data', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
            content: fc.string({ minLength: 10, maxLength: 100 }),
            category: fc.constantFrom(...guideCategories),
            author: fc.string({ minLength: 1, maxLength: 50 }),
          }),
          async ({ title, content, category, author }) => {
            cleanup();
            mockOnSubmit.mockClear();
            
            render(
              <GuideForm
                onSubmit={mockOnSubmit}
                onCancel={mockOnCancel}
                defaultAuthor=""
              />
            );

            // Fill form with valid data
            const titleInput = screen.getByPlaceholderText(/название гайда/i);
            const contentInput = screen.getByPlaceholderText(/пиши здесь/i);
            const authorInput = screen.getByPlaceholderText(/автор/i);
            const categorySelect = screen.getByRole('combobox');

            await userEvent.type(authorInput, author);
            await userEvent.type(titleInput, title);
            await userEvent.type(contentInput, content);
            await userEvent.selectOptions(categorySelect, category);

            // Submit
            const submitButton = screen.getByRole('button', { name: /опубликовать/i });
            fireEvent.click(submitButton);

            // onSubmit should be called with valid data
            await waitFor(() => {
              expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                  title: expect.any(String),
                  content: expect.any(String),
                  category,
                })
              );
            });

            cleanup();
          }
        ),
        { numRuns: 10 } // Reduced for performance
      );
    });
  });

  /**
   * Property 7: Form Error Display
   * For any field that fails validation, THE Form_Manager SHALL display the corresponding error message.
   * Validates: Requirements 4.3
   */
  describe('Property 7: Form Error Display', () => {
    it('should display error message for empty title', async () => {
      render(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Fill only content, leave title empty
      const contentInput = screen.getByPlaceholderText(/пиши здесь/i);
      await userEvent.type(contentInput, 'This is valid content with more than 10 characters');

      // Try to submit
      const submitButton = screen.getByRole('button', { name: /опубликовать/i });
      fireEvent.click(submitButton);

      // Should show error for title
      await waitFor(() => {
        expect(screen.getByText(/название обязательно/i)).toBeInTheDocument();
      });
    });

    it('should display error message for short content', async () => {
      render(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Fill title but short content
      const titleInput = screen.getByPlaceholderText(/название гайда/i);
      const contentInput = screen.getByPlaceholderText(/пиши здесь/i);
      
      await userEvent.type(titleInput, 'Valid Title');
      await userEvent.type(contentInput, 'Short'); // Less than 10 chars

      // Try to submit
      const submitButton = screen.getByRole('button', { name: /опубликовать/i });
      fireEvent.click(submitButton);

      // Should show error for content
      await waitFor(() => {
        expect(screen.getByText(/минимум 10 символов/i)).toBeInTheDocument();
      });
    });
  });

  /**
   * Property 8: Form Reset on Success
   * For any successful form submission, THE Form_Manager SHALL reset all fields to their default values.
   * Validates: Requirements 4.4
   */
  describe('Property 8: Form Reset on Success', () => {
    it('should reset form after successful submission', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
            content: fc.string({ minLength: 10, maxLength: 100 }),
          }),
          async ({ title, content }) => {
            cleanup();
            mockOnSubmit.mockClear();
            mockOnSubmit.mockResolvedValue(undefined);

            render(
              <GuideForm
                onSubmit={mockOnSubmit}
                onCancel={mockOnCancel}
              />
            );

            // Fill form
            const titleInput = screen.getByPlaceholderText(/название гайда/i) as HTMLInputElement;
            const contentInput = screen.getByPlaceholderText(/пиши здесь/i) as HTMLTextAreaElement;

            await userEvent.type(titleInput, title);
            await userEvent.type(contentInput, content);

            // Verify filled
            expect(titleInput.value).toBe(title);
            expect(contentInput.value).toBe(content);

            // Submit
            const submitButton = screen.getByRole('button', { name: /опубликовать/i });
            fireEvent.click(submitButton);

            // Wait for submission and reset
            await waitFor(() => {
              expect(mockOnSubmit).toHaveBeenCalled();
            });

            // Form should be reset
            await waitFor(() => {
              expect(titleInput.value).toBe('');
              expect(contentInput.value).toBe('');
            });

            cleanup();
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Cancel functionality', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      render(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /отмена/i });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
