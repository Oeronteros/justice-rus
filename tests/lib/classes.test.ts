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
      accentColor: '#77ffd6',
      gradientStart: '#08211e',
      gradientMid: '#0d3934',
      gradientEnd: '#126255',
      ringColor: 'rgba(152, 255, 224, 0.35)',
    });
    expect(getClassVisual('Bloodstorm')).toEqual({
      accentColor: '#ff7f78',
      gradientStart: '#2a1215',
      gradientMid: '#3a171b',
      gradientEnd: '#5f1f28',
      ringColor: 'rgba(255, 145, 139, 0.35)',
    });
    expect(getClassVisual('Numina')).toEqual({
      accentColor: '#b68cff',
      gradientStart: '#1d1332',
      gradientMid: '#312054',
      gradientEnd: '#56308e',
      ringColor: 'rgba(196, 164, 255, 0.35)',
    });
    expect(getClassVisual('Celestune')).toEqual({
      accentColor: '#4b79ff',
      gradientStart: '#0d1c4a',
      gradientMid: '#10296b',
      gradientEnd: '#1b49b4',
      ringColor: 'rgba(111, 150, 255, 0.35)',
    });
    expect(getClassVisual('Sylph')).toEqual({
      accentColor: '#ffb8bc',
      gradientStart: '#231520',
      gradientMid: '#402134',
      gradientEnd: '#6f3154',
      ringColor: 'rgba(255, 201, 204, 0.35)',
    });
    expect(getClassVisual('Nightwalker')).toEqual({
      accentColor: '#d6fbff',
      gradientStart: '#0a2528',
      gradientMid: '#103d42',
      gradientEnd: '#1d6b73',
      ringColor: 'rgba(209, 252, 255, 0.35)',
    });
    expect(getClassVisual('unknown')).toBeNull();
  });
});
