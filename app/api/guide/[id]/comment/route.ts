import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { ensureGuideSchema } from '@/lib/guides/schema';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

const commentSchema = z.object({
  author: z.string().trim().min(1).max(60).optional(),
  comment: z.string().trim().min(1).max(3000),
});

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    const payload = commentSchema.parse(await request.json());

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

    const author = payload.author || decoded.nickname || decoded.discordId || decoded.role;

    const inserted = await pool.query(
      `
      INSERT INTO guide_comment (guide_id, author, comment)
      VALUES ($1, $2, $3)
      RETURNING id, author, comment, created_at
      `,
      [guideId, author, payload.comment]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
        author: row.author || 'unknown',
        comment: row.comment || '',
        createdAt: (row.created_at || new Date()).toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating guide comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
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
