import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ensureGuideSchema } from '@/lib/guides/schema';
import { getPool } from '@/lib/neon';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
} from '@/lib/server/route-helpers';

const commentSchema = z.object({
  author: z.string().trim().min(1).max(60).optional(),
  comment: z.string().trim().min(1).max(3000),
});

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return auth.response;
    }

    const decoded = auth.value;

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody<z.infer<typeof commentSchema>>(request, commentSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;

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
    return handleRouteError(error, {
      logLabel: 'Error creating guide comment:',
      fallbackMessage: 'Failed to create comment',
    });
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
