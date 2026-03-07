import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { ensureGuideSchema, seedGuidesIfEmpty } from '@/lib/guides/schema';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guideCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  content: z.string().trim().min(1).max(500_000),
  category: z.string().trim().min(1).max(60).optional(),
  author: z.string().trim().min(1).max(100).optional(),
});

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

    await ensureGuideSchema();
    await seedGuidesIfEmpty();

    const pool = getPool();
    const result = await pool.query(`
      SELECT
        g.id,
        g.title,
        g.category,
        g.author,
        g.created_at,
        g.updated_at,
        COALESCE(v.votes, 0)::int AS votes,
        COALESCE(c.comments, 0)::int AS comments
      FROM guide g
      LEFT JOIN (
        SELECT guide_id, COUNT(*) AS votes
        FROM guide_vote
        GROUP BY guide_id
      ) v ON v.guide_id = g.id
      LEFT JOIN (
        SELECT guide_id, COUNT(*) AS comments
        FROM guide_comment
        GROUP BY guide_id
      ) c ON c.guide_id = g.id
      ORDER BY g.updated_at DESC
      LIMIT 200
    `);

    const data = result.rows.map((row) => ({
      id: String(row.id),
      title: row.title || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      createdAt: (row.created_at || new Date()).toISOString(),
      updatedAt: (row.updated_at || row.created_at || new Date()).toISOString(),
      votes: row.votes || 0,
      commentsCount: row.comments || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading guides:', error);
    return NextResponse.json({ error: 'Failed to load guides' }, { status: 500 });
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

    const payload = guideCreateSchema.parse(await request.json());

    await ensureGuideSchema();
    const pool = getPool();

    const author = payload.author || decoded.nickname || decoded.discordId || decoded.role;
    const category = payload.category || 'general';

    const ownerAccountId = decoded.id && Number.isFinite(Number(decoded.id)) ? Number(decoded.id) : null;

    const inserted = await pool.query(
      `
      INSERT INTO guide (owner_account_id, title, content_md, category, author, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, owner_account_id, title, category, author, created_at, updated_at
      `,
      [ownerAccountId, payload.title, payload.content, category, author]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
        ownerAccountId: row.owner_account_id == null ? null : String(row.owner_account_id),
        title: row.title,
        category: row.category,
        author: row.author,
        createdAt: (row.created_at || new Date()).toISOString(),
        updatedAt: (row.updated_at || row.created_at || new Date()).toISOString(),
        votes: 0,
        commentsCount: 0,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating guide:', error);
    return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
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
