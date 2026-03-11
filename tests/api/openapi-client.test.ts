import { describe, expect, it } from 'vitest';
import { configureOpenApiClient, openApiClient, sameOriginOpenApiClient } from '@/lib/api/openapi-client';

describe('openapi client config', () => {
  it('configures the same-origin client with credentials and JSON headers', () => {
    const config = sameOriginOpenApiClient.getConfig();

    expect(config.baseUrl).toBe('');
    expect(config.credentials).toBe('include');
    expect(config.headers).toMatchObject({
      'Content-Type': 'application/json',
    });
  });

  it('configures the shared bot client and returns it', () => {
    const configured = configureOpenApiClient();
    const config = openApiClient.getConfig();

    expect(configured).toBe(openApiClient);
    expect(config.credentials).toBe('include');
    expect(config.headers).toMatchObject({
      'Content-Type': 'application/json',
    });
    expect(typeof config.baseUrl).toBe('string');
    expect(config.baseUrl.length).toBeGreaterThan(0);
  });
});
