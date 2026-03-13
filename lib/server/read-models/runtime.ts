import { getErrorPayloadMessage } from '@/lib/server/error-payload';

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
