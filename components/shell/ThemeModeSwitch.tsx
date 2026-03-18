'use client';

import * as stylex from '@stylexjs/stylex';
import { Language } from '@/lib/i18n';
import { useOptionalTheme, type ThemeMode } from '@/lib/theme/context';
import WuxiaIcon from '@/components/WuxiaIcons';
import { shellStyles } from './Shell.stylex';

interface ThemeModeSwitchProps {
  language: Language;
}

const labels: Record<Language, Record<ThemeMode, string>> = {
  ru: {
    system: 'Система',
    dark: 'Тьма',
    light: 'Свет',
  },
  en: {
    system: 'System',
    dark: 'Dark',
    light: 'Light',
  },
  zh: {
    system: '系统',
    dark: '暗色',
    light: '亮色',
  },
};

const switchOptions: Array<{ mode: ThemeMode; icon: 'sparkle' | 'moon' | 'sun' }> = [
  { mode: 'system', icon: 'sparkle' },
  { mode: 'dark', icon: 'moon' },
  { mode: 'light', icon: 'sun' },
];

export default function ThemeModeSwitch({ language }: ThemeModeSwitchProps) {
  const theme = useOptionalTheme();
  const mode = theme?.mode ?? 'dark';
  const setMode = theme?.setMode ?? (() => undefined);
  const iconClassName = stylex.props(shellStyles.themeToggleIcon).className ?? '';

  return (
    <div {...stylex.props(shellStyles.themeToggleGroup)} role="group" aria-label={labels[language].system}>
      {switchOptions.map((option) => {
        const isActive = mode === option.mode;

        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => setMode(option.mode)}
            {...stylex.props(shellStyles.themeToggleButton, isActive && shellStyles.themeToggleButtonActive)}
            aria-pressed={isActive}
            title={labels[language][option.mode]}
          >
            <WuxiaIcon name={option.icon} className={iconClassName} />
            <span {...stylex.props(shellStyles.themeToggleLabel)}>{labels[language][option.mode]}</span>
          </button>
        );
      })}
    </div>
  );
}
