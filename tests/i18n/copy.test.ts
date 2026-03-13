import { describe, expect, it } from 'vitest';
import { navItems } from '@/lib/nav';
import { headerCopy, portalCopy, sectionLabels } from '@/lib/i18n';
import { supportedLanguages } from '@/lib/i18n/shared';

describe('i18n copy source of truth', () => {
  it('defines shell copy for every supported language', () => {
    for (const language of supportedLanguages) {
      expect(headerCopy[language].brandSubtitle).toBeTruthy();
      expect(headerCopy[language].languageSwitcher).toBeTruthy();
      expect(portalCopy[language].oath).toBeTruthy();
      expect(portalCopy[language].heroTitle).toBeTruthy();
    }
  });

  it('defines a navigation label for every nav section in every supported language', () => {
    for (const language of supportedLanguages) {
      for (const item of navItems) {
        expect(sectionLabels[language][item.section]).toBeTruthy();
      }
    }
  });
});
