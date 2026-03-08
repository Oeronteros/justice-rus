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

    expect(getClassVisual('Dragon Roar')).toEqual({
      accentClassName: 'text-[#ff7f78]',
      surfaceClassName: 'from-[#2a1215] via-[#3a171b] to-[#5f1f28]',
      ringClassName: 'ring-[#ff918b]/35',
    });
    expect(getClassVisual('Sylph')).toEqual({
      accentClassName: 'text-[#4b79ff]',
      surfaceClassName: 'from-[#0d1c4a] via-[#10296b] to-[#1b49b4]',
      ringClassName: 'ring-[#6f96ff]/35',
    });
    expect(getClassVisual('unknown')).toBeNull();
  });
});
