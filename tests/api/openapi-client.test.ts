import { describe, expect, it } from 'vitest';
import { configureOpenApiClient, openApiClient, sameOriginOpenApiClient } from '@/lib/api/openapi-client';

function getContentType(headers: HeadersInit | Record<string, unknown> | undefined) {
  if (!headers) {
    return null;
  }

  if (headers instanceof Headers) {
    return headers.get('Content-Type');
  }

  if (Array.isArray(headers)) {
    const pair = headers.find(([key]) => key.toLowerCase() === 'content-type');
    return pair?.[1] ?? null;
  }

  const value = headers['Content-Type'];
  return typeof value === 'string' ? value : null;
}

describe('openapi client config', () => {
  it('configures the same-origin client with credentials and JSON headers', () => {
    const config = sameOriginOpenApiClient.getConfig();

    expect(config.baseUrl).toBe('');
    expect(config.credentials).toBe('include');
    expect(getContentType(config.headers)).toBe('application/json');
  });

  it('configures the shared bot client and returns it', () => {
    const configured = configureOpenApiClient();
    const config = openApiClient.getConfig();

    expect(configured).toBe(openApiClient);
    expect(config.credentials).toBe('include');
    expect(getContentType(config.headers)).toBe('application/json');
    expect(typeof config.baseUrl).toBe('string');
    expect((config.baseUrl ?? '').length).toBeGreaterThan(0);
  });
});
