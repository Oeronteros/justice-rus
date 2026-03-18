import { describe, expect, it } from 'vitest';
import { createAuthRateLimiter } from '@/lib/server/auth/rate-limit';

describe('auth rate limiter', () => {
  it('blocks after reaching max attempts and reports retry-after', () => {
    const limiter = createAuthRateLimiter({
      windowMs: 60_000,
      maxAttempts: 2,
      blockMs: 5_000,
    });
    const now = Date.now();

    limiter.registerFailure('127.0.0.1', now);
    expect(limiter.checkRateLimit('127.0.0.1', now + 10).allowed).toBe(true);

    limiter.registerFailure('127.0.0.1', now + 20);
    const blocked = limiter.checkRateLimit('127.0.0.1', now + 30);

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it('clears failures and allows traffic again', () => {
    const limiter = createAuthRateLimiter({
      windowMs: 60_000,
      maxAttempts: 1,
      blockMs: 5_000,
    });
    const now = Date.now();

    limiter.registerFailure('10.0.0.1', now);
    expect(limiter.checkRateLimit('10.0.0.1', now + 10).allowed).toBe(true);
    limiter.registerFailure('10.0.0.1', now + 20);
    expect(limiter.checkRateLimit('10.0.0.1', now + 30).allowed).toBe(false);

    limiter.clearFailures('10.0.0.1');
    expect(limiter.checkRateLimit('10.0.0.1', now + 40).allowed).toBe(true);
  });
});
