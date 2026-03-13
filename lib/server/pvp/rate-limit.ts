type RateLimitAction = 'queue' | 'report';

const RATE_LIMIT_WINDOW_MS = 10_000;
const rateLimitCaps: Record<RateLimitAction, number> = {
  queue: 8,
  report: 12,
};
const rateLimitBuckets = new Map<string, { windowStartedAt: number; count: number }>();

export class PvpRateLimitError extends Error {
  readonly status = 429;

  constructor(message: string) {
    super(message);
    this.name = 'PvpRateLimitError';
  }
}

export function touchRateLimit(actorId: string, action: RateLimitAction) {
  const now = Date.now();
  const key = `${action}:${actorId}`;
  const cap = rateLimitCaps[action];
  const current = rateLimitBuckets.get(key);

  if (!current || now - current.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { windowStartedAt: now, count: 1 });
  } else {
    current.count += 1;
    if (current.count > cap) {
      throw new PvpRateLimitError('Too many PvP actions. Try again in a few seconds.');
    }
  }

  if (rateLimitBuckets.size > 500) {
    for (const [bucketKey, bucket] of rateLimitBuckets.entries()) {
      if (now - bucket.windowStartedAt > RATE_LIMIT_WINDOW_MS * 3) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }
}
