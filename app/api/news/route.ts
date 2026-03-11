import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { extractMessageUrlInput, isDiscordMessageUrl } from '@/lib/news/message-url';
import {
  ensureNewsSourceSchema,
  fetchNewsDirect,
  getNewsReadModel,
  refreshNewsReadModelAfterWrite,
} from '@/lib/server/read-models/news';
import { requireSameOrigin } from '@/lib/server/route-helpers';

const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function buildBotHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...(BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY, Authorization: `Bearer ${BOT_API_KEY}` } : {}),
  };
}

type BotPublishResult = {
  status: 'sent' | 'failed' | 'pending';
  messageUrl?: string;
  messageId?: string;
  error?: string;
  publishedAt?: string;
};

async function publishNewsToDiscord(payload: {
  newsId: string;
  publishKey: string;
  title: string;
  content: string;
  author: string;
  pinned: boolean;
}): Promise<BotPublishResult> {
  const response = await fetch(`${DISCORD_BOT_API_URL}/api/internal/news/publish`, {
    method: 'POST',
    headers: buildBotHeaders(),
    body: JSON.stringify({
      news_id: payload.newsId,
      idempotency_key: payload.publishKey,
      title: payload.title,
      content: payload.content,
      author: payload.author,
      pinned: payload.pinned,
    }),
    cache: 'no-store',
  });

  const body: Record<string, unknown> = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      status: 'failed',
      error: String(body.error || body.detail || body.message || `HTTP ${response.status}`),
    };
  }

  return {
    status: String(body.status || 'sent') as BotPublishResult['status'],
    messageUrl: body.message_url ? String(body.message_url) : undefined,
    messageId: body.message_id ? String(body.message_id) : undefined,
    error: body.error ? String(body.error) : undefined,
    publishedAt: body.published_at ? String(body.published_at) : undefined,
  };
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    if (hasDatabaseUrl()) {
      const news = await getNewsReadModel();
      if (news.length > 0) {
        return NextResponse.json(news, { status: 200, headers: corsHeaders });
      }
    }

    const botNews = await fetchNewsDirect(token);
    return NextResponse.json(botNews, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return NextResponse.json({ error: 'Forbidden origin' }, { status: 403, headers: corsHeaders });
    }

    const token = getAuthToken(request);

    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers: corsHeaders });
    }

    await ensureNewsSourceSchema();

    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title : '';
    const content = typeof body?.content === 'string' ? body.content : '';
    const author = typeof body?.author === 'string' ? body.author : '';
    const pinned = Boolean(body?.pinned);
    const messageUrl = extractMessageUrlInput(body);
    const resolvedAuthor = author || decoded.nickname || decoded.discordId || decoded.role;

    if (!title || !content || !resolvedAuthor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
    }

    if (messageUrl && !isDiscordMessageUrl(messageUrl)) {
      return NextResponse.json(
        { error: 'messageUrl must be a valid Discord message URL' },
        { status: 400, headers: corsHeaders }
      );
    }

    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO news (title, content, author, pinned, message_url, discord_delivery_status, discord_delivery_error)
       VALUES ($1, $2, $3, $4, $5, 'pending', NULL)
       RETURNING id, title, content, author, date, pinned, created_at, message_url,
                 discord_delivery_status, discord_delivery_error, published_to_discord_at`,
      [title, content, resolvedAuthor, pinned, messageUrl]
    );

    const createdRow = result.rows[0];
    const newsId = String(createdRow.id);
    const publishKey = `site-news-${newsId}`;

    await pool.query('UPDATE news SET publish_key = $2 WHERE id = $1', [newsId, publishKey]);

    const publishResult: BotPublishResult = await publishNewsToDiscord({
      newsId,
      publishKey,
      title: String(createdRow.title || title),
      content: String(createdRow.content || content),
      author: String(createdRow.author || resolvedAuthor),
      pinned: Boolean(createdRow.pinned),
    }).catch((error: unknown): BotPublishResult => ({
      status: 'failed' as const,
      error: error instanceof Error ? error.message : 'Discord publish failed',
    }));

    const updatedPublish = await pool.query(
      `UPDATE news
       SET message_url = COALESCE($2, message_url),
           discord_delivery_status = $3,
           discord_delivery_error = $4,
           published_to_discord_at = COALESCE($5::timestamp, published_to_discord_at),
           created_at = created_at
       WHERE id = $1
       RETURNING id, title, content, author, date, pinned, created_at, message_url,
                 discord_delivery_status, discord_delivery_error, published_to_discord_at`,
      [
        newsId,
        publishResult.messageUrl ?? messageUrl ?? null,
        publishResult.status,
        publishResult.error ?? null,
        publishResult.publishedAt ?? null,
      ]
    );

    await refreshNewsReadModelAfterWrite();

    const finalRow = updatedPublish.rows[0];
    const news = {
      id: String(finalRow.id),
      title: String(finalRow.title || ''),
      content: String(finalRow.content || ''),
      author: String(finalRow.author || ''),
      date: finalRow.date instanceof Date ? finalRow.date.toISOString() : String(finalRow.date || ''),
      pinned: Boolean(finalRow.pinned),
      messageUrl: finalRow.message_url ? String(finalRow.message_url) : undefined,
      discordDeliveryStatus: String(finalRow.discord_delivery_status || 'pending'),
      discordDeliveryError: finalRow.discord_delivery_error ? String(finalRow.discord_delivery_error) : undefined,
      publishedToDiscordAt: finalRow.published_to_discord_at
        ? finalRow.published_to_discord_at instanceof Date
          ? finalRow.published_to_discord_at.toISOString()
          : String(finalRow.published_to_discord_at)
        : undefined,
    };

    return NextResponse.json(news, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      {
        error: 'Failed to create news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
