import { ApiError } from '@/lib/api/errors';

type ErrorEnvelope = {
  error?: unknown;
  message?: unknown;
};

function extractErrorMessage(payload: unknown): string | null {
  if (typeof payload === 'string') {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const envelope = payload as ErrorEnvelope;
  if (typeof envelope.error === 'string' && envelope.error.trim().length > 0) {
    return envelope.error;
  }

  if (typeof envelope.message === 'string' && envelope.message.trim().length > 0) {
    return envelope.message;
  }

  return null;
}

export function toApiError(payload: unknown, status: number, fallbackMessage: string): ApiError {
  return new ApiError(extractErrorMessage(payload) ?? fallbackMessage, status);
}

export async function parseJsonResponse(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}
