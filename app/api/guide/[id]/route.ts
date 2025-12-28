import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guideUpdateSchema = z.object({
  title: z.string().trim().min(1).max(140).optional(),
  content: z.string().trim().min(1).max(50_000).optional(),
  category: z.string().trim().min(1).max(60).optional(),
});

function getAuthToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth_token')?.value;
  const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);
  return token || null;
}

async function ensureGuideSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content_md TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      author TEXT NOT NULL DEFAULT 'unknown',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide_comment (
      id SERIAL PRIMARY KEY,
      guide_id INTEGER NOT NULL REFERENCES guide(id) ON DELETE CASCADE,
      author TEXT NOT NULL DEFAULT 'unknown',
      comment TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide_vote (
      guide_id INTEGER NOT NULL REFERENCES guide(id) ON DELETE CASCADE,
      voter_key TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (guide_id, voter_key)
    );
  `);
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    await ensureGuideSchema();
    const pool = getPool();

    const { id } = await context.params;
    const guideId = Number(id);
    if (!Number.isFinite(guideId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const voterKey = (searchParams.get('voterKey') || '').trim();

    const guideRes = await pool.query(
      `
      SELECT id, title, content_md, category, author, created_at, updated_at
      FROM guide
      WHERE id = $1
      `,
      [guideId]
    );

    const guideRow = guideRes.rows[0];
    if (!guideRow) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const votesRes = await pool.query(
      `SELECT COUNT(*)::int AS votes FROM guide_vote WHERE guide_id = $1`,
      [guideId]
    );
    const votes = votesRes.rows[0]?.votes || 0;

    const commentsRes = await pool.query(
      `
      SELECT id, author, comment, created_at
      FROM guide_comment
      WHERE guide_id = $1
      ORDER BY created_at ASC
      LIMIT 500
      `,
      [guideId]
    );

    const votedRes =
      voterKey.length > 0
        ? await pool.query(
            `SELECT 1 FROM guide_vote WHERE guide_id = $1 AND voter_key = $2 LIMIT 1`,
            [guideId, voterKey]
          )
        : { rowCount: 0 };

    return NextResponse.json({
      guide: {
        id: String(guideRow.id),
        title: guideRow.title || '',
        content: guideRow.content_md || '',
        category: guideRow.category || 'general',
        author: guideRow.author || 'unknown',
        createdAt: (guideRow.created_at || new Date()).toISOString(),
        updatedAt: (guideRow.updated_at || guideRow.created_at || new Date()).toISOString(),
      },
      votes,
      voted: (votedRes as any).rowCount > 0,
      comments: commentsRes.rows.map((row) => ({
        id: String(row.id),
        author: row.author || 'unknown',
        comment: row.comment || '',
        createdAt: (row.created_at || new Date()).toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error loading guide:', error);
    return NextResponse.json({ error: 'Failed to load guide' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    const payload = guideUpdateSchema.parse(await request.json());
    if (!payload.title && !payload.content && !payload.category) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    await ensureGuideSchema();
    const pool = getPool();

    const { id } = await context.params;
    const guideId = Number(id);
    if (!Number.isFinite(guideId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const existing = await pool.query(
      `SELECT title, content_md, category FROM guide WHERE id = $1`,
      [guideId]
    );
    const row = existing.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const nextTitle = payload.title ?? row.title;
    const nextContent = payload.content ?? row.content_md;
    const nextCategory = payload.category ?? row.category;

    const updated = await pool.query(
      `
      UPDATE guide
      SET title = $2, content_md = $3, category = $4, updated_at = NOW()
      WHERE id = $1
      RETURNING id, title, content_md, category, author, created_at, updated_at
      `,
      [guideId, nextTitle, nextContent, nextCategory]
    );

    const updatedRow = updated.rows[0];
    return NextResponse.json({
      id: String(updatedRow.id),
      title: updatedRow.title || '',
      content: updatedRow.content_md || '',
      category: updatedRow.category || 'general',
      author: updatedRow.author || 'unknown',
      createdAt: (updatedRow.created_at || new Date()).toISOString(),
      updatedAt: (updatedRow.updated_at || updatedRow.created_at || new Date()).toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating guide:', error);
    return NextResponse.json({ error: 'Failed to update guide' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

