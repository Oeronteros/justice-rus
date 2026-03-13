import { z } from 'zod';

const errorPayloadSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
});

export function getErrorPayloadMessage(payload: unknown, fallbackStatus: number): string {
  const parsed = errorPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return `HTTP ${fallbackStatus}`;
  }

  return parsed.data.error || parsed.data.message || `HTTP ${fallbackStatus}`;
}
