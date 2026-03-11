import { describe, expect, it } from 'vitest';
import { defaultRegistrationColumnLabels } from '@/components/sections/registration/columnLabels';
import { normalizeRegistrationColumnLabels } from '@/lib/registration/column-labels';

describe('normalizeRegistrationColumnLabels', () => {
  it('merges partial values with defaults', () => {
    expect(
      normalizeRegistrationColumnLabels({
        guild: 'Общий клан',
      })
    ).toEqual({
      ...defaultRegistrationColumnLabels,
      guild: 'Общий клан',
    });
  });

  it('trims label values before returning them', () => {
    expect(
      normalizeRegistrationColumnLabels({
        guild: '  Общий клан  ',
      }).guild
    ).toBe('Общий клан');
  });
});
