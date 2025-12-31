import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export async function GET(request: NextRequest) {
  try {
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json([], { status: 200 });
    }

    const pool = getPool();
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

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news from database:', error);
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
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { title, content, author, pinned = false } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pool = getPool();
    const result = await pool.query(
      'INSERT INTO news (title, content, author, pinned) VALUES ($1, $2, $3, $4) RETURNING id, title, content, author, date, pinned, created_at',
      [title, content, author, pinned]
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
