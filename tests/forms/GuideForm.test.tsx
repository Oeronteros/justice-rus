import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import type { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuideForm } from '@/components/forms/GuideForm';
import { I18nProvider } from '@/lib/i18n/context';
import { guideCategories } from '@/lib/schemas/guide';

vi.mock('@/components/guides/MarkdownRenderer', () => ({
  MarkdownRenderer: ({ content }: { content: string }) => <div data-testid="markdown-preview">{content}</div>,
}));

vi.mock('@/components/guides/MilkdownMarkdownEditor', () => ({
  MilkdownMarkdownEditor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea
      aria-label="Milkdown editor"
      placeholder="Пиши в Markdown. Предпросмотр покажет итог. [[wikilinks]]"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

function renderWithI18n(node: ReactNode) {
  return render(<I18nProvider>{node}</I18nProvider>);
}

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
      renderWithI18n(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const titleInput = screen.getByPlaceholderText(/название гайда/i);
      const contentInput = screen.getByRole('textbox', { name: /milkdown editor/i });

      fireEvent.change(titleInput, { target: { value: '   ' } });
      fireEvent.change(contentInput, { target: { value: 'Valid content for the guide form' } });

      fireEvent.click(screen.getByRole('button', { name: /опубликовать/i }));

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    }, 10000);

    it('should call onSubmit with valid data', async () => {
      renderWithI18n(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const titleInput = screen.getByPlaceholderText(/название гайда/i);
      const contentInput = screen.getByRole('textbox', { name: /milkdown editor/i });
      const categorySelect = screen.getByRole('combobox');

      fireEvent.change(titleInput, { target: { value: 'Raid opener guide' } });
      fireEvent.change(contentInput, { target: { value: 'This guide covers the full opener and recovery plan.' } });
      await userEvent.selectOptions(categorySelect, guideCategories[1]);

      fireEvent.click(screen.getByRole('button', { name: /опубликовать/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Raid opener guide',
            content: 'This guide covers the full opener and recovery plan.',
            category: guideCategories[1],
          })
        );
      });
    });
  });

  /**
   * Property 7: Form Error Display
   * For any field that fails validation, THE Form_Manager SHALL display the corresponding error message.
   * Validates: Requirements 4.3
   */
  describe('Property 7: Form Error Display', () => {
    it('should display error message for empty title', async () => {
      renderWithI18n(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Fill only content, leave title empty
      const contentInput = screen.getByRole('textbox', { name: /milkdown editor/i });
      await userEvent.type(contentInput, 'This is valid content with more than 10 characters');

      // Try to submit
      const submitButton = screen.getByRole('button', { name: /опубликовать/i });
      fireEvent.click(submitButton);

      // Should show error for title
      await waitFor(() => {
        expect(screen.getByText(/название обязательно/i)).toBeInTheDocument();
      });
    }, 10000);

    it('should display error message for short content', async () => {
      renderWithI18n(
        <GuideForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Fill title but short content
      const titleInput = screen.getByPlaceholderText(/название гайда/i);
      const contentInput = screen.getByRole('textbox', { name: /milkdown editor/i });
      
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

            renderWithI18n(
              <GuideForm
                onSubmit={mockOnSubmit}
                onCancel={mockOnCancel}
              />
            );

            // Fill form
            const titleInput = screen.getByPlaceholderText(/название гайда/i) as HTMLInputElement;
            const contentInput = screen.getByRole('textbox', { name: /milkdown editor/i }) as HTMLTextAreaElement;

            fireEvent.change(titleInput, { target: { value: title } });
            fireEvent.change(contentInput, { target: { value: content } });

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
        { numRuns: 4 }
      );
    }, 15000);
  });

  describe('Cancel functionality', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      renderWithI18n(
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
