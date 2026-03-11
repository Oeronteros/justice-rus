import { describe, expect, it } from 'vitest';
import { extractMessageUrlInput, isDiscordMessageUrl } from '@/lib/news/message-url';

describe('message URL helpers', () => {
  it('prefers the camelCase messageUrl field and trims whitespace', () => {
    expect(
      extractMessageUrlInput({
        messageUrl: '  https://discord.com/channels/1/2/3  ',
        message_url: 'https://discord.com/channels/9/9/9',
      })
    ).toBe('https://discord.com/channels/1/2/3');
  });

  it('falls back to the snake_case message_url field', () => {
    expect(
      extractMessageUrlInput({
        message_url: 'https://discord.com/channels/4/5/6',
      })
    ).toBe('https://discord.com/channels/4/5/6');
  });

  it('accepts only HTTPS Discord message URLs', () => {
    expect(isDiscordMessageUrl('https://discord.com/channels/1/2/3')).toBe(true);
    expect(isDiscordMessageUrl('https://ptb.discord.com/channels/1/2/3')).toBe(true);
    expect(isDiscordMessageUrl('http://discord.com/channels/1/2/3')).toBe(false);
    expect(isDiscordMessageUrl('https://example.com/channels/1/2/3')).toBe(false);
    expect(isDiscordMessageUrl('https://discord.com/channels/not-a-message')).toBe(false);
  });
});
