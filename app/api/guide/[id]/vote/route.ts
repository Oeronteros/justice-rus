import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const voteSchema = z.object({
  voterKey: z.string().trim().min(8).max(120),
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
    CREATE TABLE IF NOT EXISTS guide_vote (
      guide_id INTEGER NOT NULL REFERENCES guide(id) ON DELETE CASCADE,
      voter_key TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (guide_id, voter_key)
    );
  `);
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    const payload = voteSchema.parse(await request.json());

    await ensureGuideSchema();
    const pool = getPool();

    const { id } = await context.params;
    const guideId = Number(id);
    if (!Number.isFinite(guideId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const exists = await pool.query(`SELECT 1 FROM guide WHERE id = $1`, [guideId]);
    if (exists.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const already = await pool.query(
      `SELECT 1 FROM guide_vote WHERE guide_id = $1 AND voter_key = $2 LIMIT 1`,
      [guideId, payload.voterKey]
    );

    let voted = false;
    if (already.rowCount > 0) {
      await pool.query(`DELETE FROM guide_vote WHERE guide_id = $1 AND voter_key = $2`, [guideId, payload.voterKey]);
      voted = false;
    } else {
      await pool.query(`INSERT INTO guide_vote (guide_id, voter_key) VALUES ($1, $2)`, [guideId, payload.voterKey]);
      voted = true;
    }

    const votesRes = await pool.query(`SELECT COUNT(*)::int AS votes FROM guide_vote WHERE guide_id = $1`, [guideId]);
    const votes = votesRes.rows[0]?.votes || 0;

    return NextResponse.json({ votes, voted });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error voting guide:', error);
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

