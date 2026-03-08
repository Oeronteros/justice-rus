import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

function normalizeNews(data: any[]) {
  return data.map((item, index) => ({
    id: String(item.id ?? item.news_id ?? item.message_id ?? index + 1),
    title: String(item.title ?? item.headline ?? item.name ?? item.content ?? item.description ?? 'Untitled'),
    content: String(item.content ?? item.body ?? item.text ?? item.description ?? ''),
    author: String(item.author ?? item.author_name ?? item.username ?? item.created_by ?? item.event_type ?? 'DiscordBot2'),
    date: String(item.date ?? item.created_at ?? item.published_at ?? item.start_time ?? new Date().toISOString()),
    pinned: Boolean(item.pinned),
    messageUrl: item.message_url || item.messageUrl ? String(item.message_url ?? item.messageUrl) : undefined,
  }));
}

function buildBotHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    ...(BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY, Authorization: `Bearer ${BOT_API_KEY}` } : { Authorization: `Bearer ${token}` }),
    ...bypassHeader,
  };
}

async function fetchNewsFromBot(token: string) {
  const attempts = [
    {
      url: `${DISCORD_BOT_API_URL}/api/news`,
      extract: (payload: any) => (Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : []),
    },
    {
      url: `${DISCORD_BOT_API_URL}/api/events?page=1&page_size=20`,
      extract: (payload: any) => (Array.isArray(payload?.items) ? payload.items : Array.isArray(payload?.data) ? payload.data : []),
    },
  ];

  const errors: string[] = [];
  for (const attempt of attempts) {
    const response = await fetch(attempt.url, {
      headers: buildBotHeaders(token),
      cache: 'no-store',
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      errors.push(`${attempt.url}: ${(payload as any).error || (payload as any).message || `HTTP ${response.status}`}`);
      continue;
    }

    const rows = attempt.extract(payload);
    if (rows.length > 0) {
      return normalizeNews(rows);
    }
  }

  const hint = BOT_API_KEY
    ? 'Проверь BOT_API_URL / DISCORD_BOT_API_URL и доступность DiscordBot2.'
    : 'Добавь BOT_API_KEY или DISCORD_BOT_API_KEY для чтения защищенных эндпоинтов DiscordBot2.';
  throw new Error(`${errors.join(' | ') || 'No bot news endpoints returned data'}. ${hint}`);
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      const botNews = await fetchNewsFromBot(token);
      return NextResponse.json(botNews, { status: 200 });
    }

    const pool = getPool();
    try {
      const result = await pool.query(
        'SELECT id, title, content, author, date, pinned, created_at FROM news ORDER BY pinned DESC, date DESC, created_at DESC LIMIT 50'
      );

      const news = result.rows.map((row) => ({
        id: String(row.id),
        title: row.title,
        content: row.content,
        author: row.author,
        date: row.date instanceof Date ? row.date.toISOString() : row.date,
        pinned: Boolean(row.pinned),
      }));

      if (news.length > 0) {
        return NextResponse.json(news);
      }
    } catch (dbError) {
      console.error('Error fetching news from database:', dbError);
    }

    const botNews = await fetchNewsFromBot(token);
    return NextResponse.json(botNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { title, content, author, pinned = false } = body;
    const resolvedAuthor = author || decoded.nickname || decoded.discordId || decoded.role;

    if (!title || !content || !resolvedAuthor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pool = getPool();
    const result = await pool.query(
      'INSERT INTO news (title, content, author, pinned) VALUES ($1, $2, $3, $4) RETURNING id, title, content, author, date, pinned, created_at',
      [title, content, resolvedAuthor, pinned]
    );

    const news = {
      id: String(result.rows[0].id),
      title: result.rows[0].title,
      content: result.rows[0].content,
      author: result.rows[0].author,
      date: result.rows[0].date instanceof Date ? result.rows[0].date.toISOString() : result.rows[0].date,
      pinned: Boolean(result.rows[0].pinned),
    };

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      {
        error: 'Failed to create news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
