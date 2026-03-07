import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { ensureGuideSchema } from '@/lib/guides/schema';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { canModerateContent } from '@/lib/authz';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guideUpdateSchema = z.object({
  title: z.string().trim().min(1).max(140).optional(),
  content: z.string().trim().min(1).max(500_000).optional(),
  category: z.string().trim().min(1).max(60).optional(),
});

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    await ensureGuideSchema();
    const pool = getPool();

    const { id } = await context.params;
    const guideId = Number(id);
    if (!Number.isFinite(guideId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const voterKey = decoded.id ? `account:${decoded.id}` : (searchParams.get('voterKey') || '').trim();

    const guideRes = await pool.query(
      `
      SELECT id, owner_account_id, title, content_md, category, author, created_at, updated_at
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
        ownerAccountId: guideRow.owner_account_id == null ? null : String(guideRow.owner_account_id),
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

    const isModerator = canModerateContent(decoded.role);

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
      `SELECT owner_account_id, title, content_md, category FROM guide WHERE id = $1`,
      [guideId]
    );
    const row = existing.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const accountId = decoded.id && Number.isFinite(Number(decoded.id)) ? Number(decoded.id) : null;
    const isOwner = accountId != null && row.owner_account_id != null && Number(row.owner_account_id) === accountId;
    if (!isModerator && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const nextTitle = payload.title ?? row.title;
    const nextContent = payload.content ?? row.content_md;
    const nextCategory = payload.category ?? row.category;

    const updated = await pool.query(
      `
      UPDATE guide
      SET title = $2, content_md = $3, category = $4, updated_at = NOW()
      WHERE id = $1
      RETURNING id, owner_account_id, title, content_md, category, author, created_at, updated_at
      `,
      [guideId, nextTitle, nextContent, nextCategory]
    );

    const updatedRow = updated.rows[0];
    return NextResponse.json({
      id: String(updatedRow.id),
      ownerAccountId: updatedRow.owner_account_id == null ? null : String(updatedRow.owner_account_id),
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
      'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!canModerateContent(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured (missing DATABASE_URL)' }, { status: 503 });
    }

    await ensureGuideSchema();
    const pool = getPool();
    const { id } = await context.params;
    const guideId = Number(id);
    if (!Number.isFinite(guideId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const deleted = await pool.query(`DELETE FROM guide WHERE id = $1 RETURNING id`, [guideId]);
    if (!deleted.rows[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting guide:', error);
    return NextResponse.json({ error: 'Failed to delete guide' }, { status: 500 });
  }
}
