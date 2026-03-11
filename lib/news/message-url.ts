const DISCORD_MESSAGE_PATH_RE = /^\/channels\/\d+\/\d+\/\d+$/;

function readStringField(record: Record<string, unknown>, key: 'messageUrl' | 'message_url'): string {
  const value = record[key];
  return typeof value === 'string' ? value.trim() : '';
}

export function extractMessageUrlInput(body: unknown): string | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const record = body as Record<string, unknown>;
  return readStringField(record, 'messageUrl') || readStringField(record, 'message_url') || null;
}

export function isDiscordMessageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const isDiscordHost =
      hostname === 'discord.com'
      || hostname.endsWith('.discord.com')
      || hostname === 'discordapp.com'
      || hostname.endsWith('.discordapp.com');

    return url.protocol === 'https:' && isDiscordHost && DISCORD_MESSAGE_PATH_RE.test(url.pathname);
  } catch {
    return false;
  }
}
