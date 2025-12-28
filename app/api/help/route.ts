import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const helpCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  details: z.string().trim().min(1).max(5000),
  category: z.string().trim().min(1).max(60).optional(),
  author: z.string().trim().min(1).max(60).optional(),
});

const helpUpdateSchema = z.object({
  id: z.union([z.string(), z.number()]),
  status: z.enum(['open', 'closed']),
});

async function ensureHelpSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS help_requests (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      details TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      author TEXT NOT NULL DEFAULT 'unknown',
      status TEXT NOT NULL DEFAULT 'open',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`CREATE INDEX IF NOT EXISTS help_requests_status_idx ON help_requests(status);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS help_requests_created_at_idx ON help_requests(created_at DESC);`);
}

function getAuthToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth_token')?.value;
  const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);
  return token || null;
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        { error: 'Database is not configured (missing DATABASE_URL)' },
        { status: 503 }
      );
    }

    await ensureHelpSchema();
    const pool = getPool();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';

    const where =
      status === 'all'
        ? ''
        : `WHERE status = ${status === 'closed' ? "'closed'" : "'open'"}`;

    const result = await pool.query(
      `
      SELECT id, title, details, category, author, status, created_at
      FROM help_requests
      ${where}
      ORDER BY created_at DESC
      LIMIT 200
      `
    );

    const data = result.rows.map((row) => ({
      id: String(row.id),
      title: row.title || '',
      details: row.details || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      status: row.status === 'closed' ? 'closed' : 'open',
      createdAt: (row.created_at || new Date()).toISOString(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading help requests:', error);
    return NextResponse.json(
      { error: 'Failed to load help requests' },
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
      return NextResponse.json(
        { error: 'Database is not configured (missing DATABASE_URL)' },
        { status: 503 }
      );
    }

    const payload = helpCreateSchema.parse(await request.json());

    await ensureHelpSchema();
    const pool = getPool();

    const author = payload.author || decoded.discordId || decoded.role;
    const category = payload.category || 'general';

    const inserted = await pool.query(
      `
      INSERT INTO help_requests (title, details, category, author, status)
      VALUES ($1, $2, $3, $4, 'open')
      RETURNING id, title, details, category, author, status, created_at
      `,
      [payload.title, payload.details, category, author]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
        title: row.title,
        details: row.details,
        category: row.category,
        author: row.author,
        status: row.status === 'closed' ? 'closed' : 'open',
        createdAt: (row.created_at || new Date()).toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating help request:', error);
    return NextResponse.json(
      { error: 'Failed to create help request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (decoded.role !== 'officer' && decoded.role !== 'gm') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        { error: 'Database is not configured (missing DATABASE_URL)' },
        { status: 503 }
      );
    }

    const payload = helpUpdateSchema.parse(await request.json());

    await ensureHelpSchema();
    const pool = getPool();

    const updated = await pool.query(
      `
      UPDATE help_requests
      SET status = $2
      WHERE id = $1
      RETURNING id, title, details, category, author, status, created_at
      `,
      [payload.id, payload.status]
    );

    const row = updated.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: String(row.id),
      title: row.title,
      details: row.details,
      category: row.category,
      author: row.author,
      status: row.status === 'closed' ? 'closed' : 'open',
      createdAt: (row.created_at || new Date()).toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating help request:', error);
    return NextResponse.json(
      { error: 'Failed to update help request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

