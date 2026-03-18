type AttemptState = {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

type RateLimiterOptions = {
  windowMs: number;
  maxAttempts: number;
  blockMs: number;
};

export class AuthRateLimitError extends Error {
  readonly status = 429;
  readonly headers: HeadersInit;

  constructor(retryAfter: number) {
    super('Too many login attempts. Try again later.');
    this.name = 'AuthRateLimitError';
    this.headers = { 'Retry-After': String(retryAfter || 60) };
  }
}

export function createAuthRateLimiter(options: RateLimiterOptions) {
  const attempts = new Map<string, AttemptState>();

  function cleanupAttempts(now: number) {
    for (const [ip, state] of attempts.entries()) {
      const expiredWindow = now - state.windowStartedAt > options.windowMs;
      const unblocked = !state.blockedUntil || state.blockedUntil <= now;
      if (expiredWindow && unblocked) {
        attempts.delete(ip);
      }
    }
  }

  function checkRateLimit(ip: string, now: number): { allowed: boolean; retryAfter?: number } {
    cleanupAttempts(now);
    const state = attempts.get(ip);
    if (!state) return { allowed: true };

    if (state.blockedUntil && state.blockedUntil > now) {
      const retryAfter = Math.max(1, Math.ceil((state.blockedUntil - now) / 1000));
      return { allowed: false, retryAfter };
    }

    if (now - state.windowStartedAt > options.windowMs) {
      attempts.set(ip, { count: 0, windowStartedAt: now });
      return { allowed: true };
    }

    return { allowed: true };
  }

  function registerFailure(ip: string, now: number) {
    const state = attempts.get(ip);
    if (!state || now - state.windowStartedAt > options.windowMs) {
      attempts.set(ip, { count: 1, windowStartedAt: now });
      return;
    }

    const nextCount = state.count + 1;
    const blockedUntil = nextCount >= options.maxAttempts ? now + options.blockMs : undefined;

    attempts.set(ip, {
      count: nextCount,
      windowStartedAt: state.windowStartedAt,
      blockedUntil,
    });
  }

  function clearFailures(ip: string) {
    attempts.delete(ip);
  }

  return {
    checkRateLimit,
    registerFailure,
    clearFailures,
  };
}
