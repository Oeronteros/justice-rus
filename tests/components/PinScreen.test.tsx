import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import PinScreen from '@/components/shell/PinScreen';
import { I18nProvider } from '@/lib/i18n/context';

vi.mock('@/lib/auth/hooks', () => ({
  useKnownClasses: () => ({
    data: ['Numina', 'Sylph'],
  }),
}));

describe('PinScreen i18n', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders English auth copy when the provider language is en', () => {
    render(
      <I18nProvider defaultLanguage="en">
        <PinScreen onAuthSuccess={vi.fn()} />
      </I18nProvider>
    );

    expect(screen.getByText('Member Access')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Guild nickname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders Russian auth copy when the provider language is ru', () => {
    render(
      <I18nProvider defaultLanguage="ru">
        <PinScreen onAuthSuccess={vi.fn()} />
      </I18nProvider>
    );

    expect(screen.getByText('Доступ участника')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Вход' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ник в гильдии')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });
});
