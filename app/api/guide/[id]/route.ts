import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { optionsResponse } from '@/lib/server/cors';
import { ensureGuideSchema } from '@/lib/guides/schema';
import { normalizeGuideTitle } from '@/lib/guides/obsidian';
import { getPool } from '@/lib/neon';
import { canModerateContent } from '@/lib/authz';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';

const guideUpdateSchema = z.object({
  title: z.string().trim().min(1).max(140).optional(),
  content: z.string().trim().min(1).max(500_000).optional(),
  category: z.string().trim().min(1).max(60).optional(),
});

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
        : null;

    const voted = (votedRes?.rowCount ?? 0) > 0;

    return NextResponse.json({
      guide: {
        id: String(guideRow.id),
        slug: normalizeGuideTitle(guideRow.title || ''),
        ownerAccountId: guideRow.owner_account_id == null ? null : String(guideRow.owner_account_id),
        title: guideRow.title || '',
        content: guideRow.content_md || '',
        category: guideRow.category || 'general',
        author: guideRow.author || 'unknown',
        createdAt: (guideRow.created_at || new Date()).toISOString(),
        updatedAt: (guideRow.updated_at || guideRow.created_at || new Date()).toISOString(),
      },
      votes,
      voted,
      comments: commentsRes.rows.map((row) => ({
        id: String(row.id),
        author: row.author || 'unknown',
        comment: row.comment || '',
        createdAt: (row.created_at || new Date()).toISOString(),
      })),
    });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error loading guide:',
      fallbackMessage: 'Failed to load guide',
    });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const auth = requireAuth(request);
    if (!auth.ok) {
      return auth.response;
    }

    const decoded = auth.value;

    const isModerator = canModerateContent(decoded.role);

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody<z.infer<typeof guideUpdateSchema>>(request, guideUpdateSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
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
      slug: normalizeGuideTitle(updatedRow.title || ''),
      ownerAccountId: updatedRow.owner_account_id == null ? null : String(updatedRow.owner_account_id),
      title: updatedRow.title || '',
      content: updatedRow.content_md || '',
      category: updatedRow.category || 'general',
      author: updatedRow.author || 'unknown',
      createdAt: (updatedRow.created_at || new Date()).toISOString(),
      updatedAt: (updatedRow.updated_at || updatedRow.created_at || new Date()).toISOString(),
    });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating guide:',
      fallbackMessage: 'Failed to update guide',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'PATCH', 'DELETE'] });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const auth = requireAuth(request);
    if (!auth.ok) {
      return auth.response;
    }

    const decoded = auth.value;

    if (!canModerateContent(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
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
    return handleRouteError(error, {
      logLabel: 'Error deleting guide:',
      fallbackMessage: 'Failed to delete guide',
    });
  }
}
