import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { I18nProvider, useTranslation, type Language } from '@/lib/i18n/context';

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

// Test component that uses translations
function TestComponent() {
  const { language, setLanguage, t } = useTranslation();
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="loading-text">{t.common.loading}</span>
      <button onClick={() => setLanguage('ru')} data-testid="set-ru">RU</button>
      <button onClick={() => setLanguage('en')} data-testid="set-en">EN</button>
    </div>
  );
}

describe('I18n Context', () => {
  /**
   * Property 11: Language Persistence
   * For any language change, THE i18n_System SHALL persist the new language to localStorage immediately.
   * Validates: Requirements 6.3
   */
  describe('Property 11: Language Persistence', () => {
    it('should persist language to localStorage on change', () => {
      const languages: Language[] = ['ru', 'en'];
      
      fc.assert(
        fc.property(
          fc.constantFrom(...languages),
          fc.constantFrom(...languages),
          (initialLang, newLang) => {
            localStorageMock.clear();

            render(
              <I18nProvider defaultLanguage={initialLang}>
                <TestComponent />
              </I18nProvider>
            );

            // Change language
            act(() => {
              fireEvent.click(screen.getByTestId(`set-${newLang}`));
            });

            // Should have persisted to localStorage
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
              'guild_portal_lang',
              newLang
            );
            expect(localStorageMock.store['guild_portal_lang']).toBe(newLang);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should persist immediately after each language change', () => {
      render(
        <I18nProvider defaultLanguage="ru">
          <TestComponent />
        </I18nProvider>
      );

      // Multiple language changes
      const sequence = ['en', 'ru', 'en', 'ru', 'en'] as const;
      
      sequence.forEach((lang) => {
        act(() => {
          fireEvent.click(screen.getByTestId(`set-${lang}`));
        });
        
        // Should persist immediately after each change
        expect(localStorageMock.store['guild_portal_lang']).toBe(lang);
      });
    });
  });

  /**
   * Property 12: Language Restoration
   * For any Portal load where localStorage contains a valid language preference, THE i18n_System SHALL use that language.
   * Validates: Requirements 6.4
   */
  describe('Property 12: Language Restoration', () => {
    it('should restore language from localStorage on mount', () => {
      const languages: Language[] = ['ru', 'en'];
      
      fc.assert(
        fc.property(
          fc.constantFrom(...languages),
          (storedLang) => {
            localStorageMock.clear();
            localStorageMock.store['guild_portal_lang'] = storedLang;
            localStorageMock.getItem.mockImplementation((key) => localStorageMock.store[key] || null);

            const { unmount } = render(
              <I18nProvider defaultLanguage="ru">
                <TestComponent />
              </I18nProvider>
            );

            // Should have called getItem to check stored preference
            expect(localStorageMock.getItem).toHaveBeenCalledWith('guild_portal_lang');

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default language when localStorage is empty', () => {
      localStorageMock.clear();
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <I18nProvider defaultLanguage="ru">
          <TestComponent />
        </I18nProvider>
      );

      expect(screen.getByTestId('current-language')).toHaveTextContent('ru');
    });

    it('should ignore invalid language values in localStorage', () => {
      localStorageMock.clear();
      localStorageMock.store['guild_portal_lang'] = 'invalid';
      localStorageMock.getItem.mockImplementation((key) => localStorageMock.store[key] || null);

      render(
        <I18nProvider defaultLanguage="ru">
          <TestComponent />
        </I18nProvider>
      );

      // Should fall back to default
      expect(screen.getByTestId('current-language')).toHaveTextContent('ru');
    });
  });

  describe('Translation updates', () => {
    it('should update translations when language changes', () => {
      render(
        <I18nProvider defaultLanguage="ru">
          <TestComponent />
        </I18nProvider>
      );

      // Initially Russian
      expect(screen.getByTestId('loading-text')).toHaveTextContent('Загрузка...');

      // Change to English
      act(() => {
        fireEvent.click(screen.getByTestId('set-en'));
      });

      expect(screen.getByTestId('loading-text')).toHaveTextContent('Loading...');

      // Change back to Russian
      act(() => {
        fireEvent.click(screen.getByTestId('set-ru'));
      });

      expect(screen.getByTestId('loading-text')).toHaveTextContent('Загрузка...');
    });
  });
});
