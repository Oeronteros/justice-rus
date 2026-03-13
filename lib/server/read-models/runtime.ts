import { getErrorPayloadMessage } from '@/lib/server/error-payload';
import { isReadModelStale, type ReadModelState } from './shared';

export function getReadModelTunnelBypassHeaders(origin: string): Record<string, string> {
  return origin.includes('.loca.lt') || origin.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};
}

export function getReadModelFetchErrorMessage(payload: unknown, status: number): string {
  return getErrorPayloadMessage(payload, status);
}

export async function refreshReadModelAfterWrite(
  syncReadModel: () => Promise<unknown>,
  logLabel: string
): Promise<void> {
  try {
    await syncReadModel();
  } catch (error) {
    console.error(logLabel, error);
  }
}

export async function resolveReadModelSnapshot<T>({
  snapshot,
  state,
  ttlMs,
  sync,
  staleLogLabel,
}: {
  snapshot: T[];
  state: ReadModelState | null;
  ttlMs: number;
  sync: () => Promise<T[]>;
  staleLogLabel: string;
}): Promise<T[]> {
  if (snapshot.length > 0 && !isReadModelStale(state, ttlMs)) {
    return snapshot;
  }

  try {
    const fresh = await sync();
    return fresh.length > 0 ? fresh : snapshot;
  } catch (error) {
    if (snapshot.length > 0) {
      console.error(staleLogLabel, error);
      return snapshot;
    }

    throw error;
  }
}
