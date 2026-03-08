import { describe, expect, it } from 'vitest';
import { fallbackKnownClasses, getClassVisual, getKnownClassName, getKnownClasses, isKnownClassName } from '@/lib/classes';

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

  it('normalizes known class names and returns icon visuals', () => {
    expect(getKnownClassName(' dragon roar ')).toBe('Dragon Roar');
    expect(getKnownClassName('unknown')).toBeNull();

    expect(getClassVisual('Sylph')).toEqual({
      accentClassName: 'text-[#b979ff]',
      surfaceClassName: 'from-[#21112f] via-[#3c1a59] to-[#6a2da6]',
      ringClassName: 'ring-[#cb98ff]/35',
    });
    expect(getClassVisual('unknown')).toBeNull();
  });
});
