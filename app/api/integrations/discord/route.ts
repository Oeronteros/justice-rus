import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { canManageAccounts } from '@/lib/authz';
import { requireSameOrigin } from '@/lib/server/route-helpers';

const BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

const discordConfigSchema = z.object({
  botToken: z.string().optional(),
  guildId: z.string().optional(),
  apiBaseUrl: z.string().url().optional(),
  apiKey: z.string().optional(),
  webhookUrls: z.object({
    news: z.string().url().optional(),
    absences: z.string().url().optional(),
    help: z.string().url().optional(),
    pvp: z.string().url().optional(),
  }).optional(),
  channelIds: z.object({
    news: z.string().optional(),
    announcements: z.string().optional(),
    help: z.string().optional(),
    absences: z.string().optional(),
    pvp: z.string().optional(),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || !canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return current config (from environment or database)
    return NextResponse.json({
      botToken: process.env.DISCORD_BOT_TOKEN ? '***configured***' : undefined,
      guildId: process.env.DISCORD_GUILD_ID,
      apiBaseUrl: BOT_API_URL,
      apiKey: BOT_API_KEY ? '***configured***' : undefined,
      webhookUrls: {
        news: process.env.DISCORD_NEWS_WEBHOOK,
        absences: process.env.DISCORD_ABSENCES_WEBHOOK,
        help: process.env.DISCORD_HELP_WEBHOOK,
        pvp: process.env.DISCORD_PVP_WEBHOOK,
      },
      channelIds: {
        news: process.env.DISCORD_NEWS_CHANNEL_ID,
        announcements: process.env.DISCORD_ANNOUNCEMENTS_CHANNEL_ID,
        help: process.env.DISCORD_HELP_CHANNEL_ID,
        absences: process.env.DISCORD_ABSENCES_CHANNEL_ID,
        pvp: process.env.DISCORD_PVP_CHANNEL_ID,
      },
    });
  } catch (error) {
    console.error('Error fetching Discord config:', error);
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || !canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const payload = discordConfigSchema.parse(await request.json());

    // In production, save to database
    // For now, just validate and return success
    console.log('Discord config updated:', { ...payload, botToken: '***', apiKey: '***' });

    return NextResponse.json({ success: true, config: payload });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating Discord config:', error);
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}

export async function POST_test(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || !canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Test connection to Discord bot API
    if (!BOT_API_URL) {
      return NextResponse.json({ 
        success: false, 
        message: 'BOT_API_URL not configured' 
      });
    }

    const response = await fetch(`${BOT_API_URL}/health`, {
      method: 'GET',
      headers: BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY } : {},
    }).catch(() => null);

    if (response?.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Connected to Discord bot API' 
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: `Failed to connect to Discord bot API (${BOT_API_URL})` 
    });
  } catch (error) {
    console.error('Error testing Discord connection:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Connection test failed' 
    }, { status: 500 });
  }
}

export async function POST_sync(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || !canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Trigger sync with Discord bot
    if (!BOT_API_URL || !BOT_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'Discord bot not configured' 
      });
    }

    const response = await fetch(`${BOT_API_URL}/api/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': BOT_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Sync failed');
    }

    const result = await response.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Sync completed',
      stats: result.stats,
    });
  } catch (error) {
    console.error('Error syncing with Discord:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Sync failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
    },
  });
}
