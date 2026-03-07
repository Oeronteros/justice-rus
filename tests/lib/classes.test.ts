import { describe, expect, it } from 'vitest';
import { fallbackKnownClasses, getKnownClasses, isKnownClassName } from '@/lib/classes';

describe('lib/classes', () => {
  it('returns the canonical class pool', async () => {
    await expect(getKnownClasses()).resolves.toEqual([
      'Ironclad',
      'Bloodstorm',
      'Numina',
      'Celestune',
      'Dragon Roar',
      'Sylph',
      'Nightwalker',
    ]);
    expect(fallbackKnownClasses).toEqual([
      'Ironclad',
      'Bloodstorm',
      'Numina',
      'Celestune',
      'Dragon Roar',
      'Sylph',
      'Nightwalker',
    ]);
  });

  it('validates only classes from the canonical pool', async () => {
    await expect(isKnownClassName('Numina')).resolves.toBe(true);
    await expect(isKnownClassName('nightwalker')).resolves.toBe(true);
    await expect(isKnownClassName(' Warrior ')).resolves.toBe(false);
    await expect(isKnownClassName('')).resolves.toBe(false);
  });
});
