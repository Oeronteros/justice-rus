import { describe, expect, it } from 'vitest';
import { getErrorPayloadMessage } from '@/lib/server/error-payload';

describe('getErrorPayloadMessage', () => {
  it('prefers the explicit error field when present', () => {
    expect(getErrorPayloadMessage({ error: 'Bot offline', message: 'ignored' }, 503)).toBe('Bot offline');
  });

  it('falls back to the message field when error is absent', () => {
    expect(getErrorPayloadMessage({ message: 'Bad gateway' }, 502)).toBe('Bad gateway');
  });

  it('falls back to the HTTP status when payload shape is invalid', () => {
    expect(getErrorPayloadMessage({ code: 'E_BAD' }, 500)).toBe('HTTP 500');
    expect(getErrorPayloadMessage('boom', 400)).toBe('HTTP 400');
  });
});
