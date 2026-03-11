import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { extractMessageUrlInput, isDiscordMessageUrl } from '@/lib/news/message-url';
import {
  fetchNewsDirect,
  getNewsReadModel,
  refreshNewsReadModelAfterWrite,
} from '@/lib/server/read-models/news';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
    const token = getAuthToken(request);

    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers: corsHeaders });
    }

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
      'INSERT INTO news (title, content, author, pinned, message_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, content, author, date, pinned, created_at, message_url',
      [title, content, resolvedAuthor, pinned, messageUrl]
    );

    await refreshNewsReadModelAfterWrite();

    const news = {
      id: String(result.rows[0].id),
      title: String(result.rows[0].title || ''),
      content: String(result.rows[0].content || ''),
      author: String(result.rows[0].author || ''),
      date: result.rows[0].date instanceof Date ? result.rows[0].date.toISOString() : String(result.rows[0].date || ''),
      pinned: Boolean(result.rows[0].pinned),
      messageUrl: result.rows[0].message_url ? String(result.rows[0].message_url) : undefined,
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
