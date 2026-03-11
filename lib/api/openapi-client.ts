import { client } from '@/lib/api/generated/client.gen';
import { createClient } from '@/lib/api/generated/client';

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_DISCORD_BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';

export const sameOriginOpenApiClient = createClient({
  baseUrl: '',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function configureOpenApiClient() {
  client.setConfig({
    baseUrl: DEFAULT_BASE_URL,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return client;
}

export { client as openApiClient };
