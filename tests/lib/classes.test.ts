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
    expect(getClassVisual('Bloodstorm')).toEqual({
      accentClassName: 'text-[#d6fbff]',
      surfaceClassName: 'from-[#0a2528] via-[#103d42] to-[#1d6b73]',
      ringClassName: 'ring-[#d1fcff]/35',
    });
    expect(getClassVisual('Numina')).toEqual({
      accentClassName: 'text-[#b68cff]',
      surfaceClassName: 'from-[#1d1332] via-[#312054] to-[#56308e]',
      ringClassName: 'ring-[#c4a4ff]/35',
    });
    expect(getClassVisual('Celestune')).toEqual({
      accentClassName: 'text-[#77ffd6]',
      surfaceClassName: 'from-[#08211e] via-[#0d3934] to-[#126255]',
      ringClassName: 'ring-[#98ffe0]/35',
    });
    expect(getClassVisual('Sylph')).toEqual({
      accentClassName: 'text-[#4b79ff]',
      surfaceClassName: 'from-[#0d1c4a] via-[#10296b] to-[#1b49b4]',
      ringClassName: 'ring-[#6f96ff]/35',
    });
    expect(getClassVisual('Nightwalker')).toEqual({
      accentClassName: 'text-[#ffb8bc]',
      surfaceClassName: 'from-[#231520] via-[#402134] to-[#6f3154]',
      ringClassName: 'ring-[#ffc9cc]/35',
    });
    expect(getClassVisual('unknown')).toBeNull();
  });
});
