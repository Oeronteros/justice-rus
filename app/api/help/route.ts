import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { canModerateContent, hasRoleAtLeast } from '@/lib/authz';
import { ensureHelpSchema } from './_shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const helpCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  details: z.string().trim().min(1).max(5000),
  category: z.string().trim().min(1).max(60).optional(),
  author: z.string().trim().min(1).max(60).optional(),
  gatheringStart: z.string().trim().min(1),
  gatheringEnd: z.string().trim().min(1),
});

const helpUpdateSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    status: z.enum(['open', 'closed']).optional(),
    gatheringStart: z.string().trim().min(1).optional(),
    gatheringEnd: z.string().trim().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    const hasStatus = Boolean(value.status);
    const hasStart = Boolean(value.gatheringStart);
    const hasEnd = Boolean(value.gatheringEnd);

    if (!hasStatus && !(hasStart && hasEnd)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Nothing to update' });
    }

    if ((hasStart || hasEnd) && !(hasStart && hasEnd)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Both gatheringStart and gatheringEnd are required' });
    }
  });

function isValidDate(date: Date): boolean {
  return Number.isFinite(date.getTime());
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
      SELECT id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
      FROM help_requests
      ${where}
      ORDER BY created_at DESC
      LIMIT 200
      `
    );

    const requestIds = result.rows
      .map((row) => Number(row.id))
      .filter((id) => Number.isFinite(id));

    const respondersByRequestId = new Map<string, any[]>();
    if (requestIds.length > 0) {
      const responders = await pool.query(
        `
        SELECT request_id, responder_user_id, responder_nickname, responder_class, responded_at
        FROM help_request_responders
        WHERE request_id = ANY($1::int[])
        ORDER BY responded_at ASC
        `,
        [requestIds]
      );

      for (const row of responders.rows) {
        const key = String(row.request_id);
        const list = respondersByRequestId.get(key) || [];
        list.push({
          userId: String(row.responder_user_id),
          nickname: row.responder_nickname || '',
          className: row.responder_class || '',
          respondedAt: (row.responded_at || new Date()).toISOString(),
        });
        respondersByRequestId.set(key, list);
      }
    }

    const data = result.rows.map((row) => {
      const createdAt = (row.created_at || new Date()).toISOString();
      const gatheringStart = row.gathering_start ? new Date(row.gathering_start).toISOString() : createdAt;
      const gatheringEnd = row.gathering_end ? new Date(row.gathering_end).toISOString() : gatheringStart;

      return {
        id: String(row.id),
        title: row.title || '',
        details: row.details || '',
        category: row.category || 'general',
        author: row.author || 'unknown',
        authorUserId: row.author_user_id ? String(row.author_user_id) : null,
        status: row.status === 'closed' ? 'closed' : 'open',
        createdAt,
        gatheringStart,
        gatheringEnd,
        responders: respondersByRequestId.get(String(row.id)) || [],
      };
    });

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

    const gatheringStart = new Date(payload.gatheringStart);
    const gatheringEnd = new Date(payload.gatheringEnd);
    if (!isValidDate(gatheringStart) || !isValidDate(gatheringEnd)) {
      return NextResponse.json({ error: 'Invalid gathering time range' }, { status: 400 });
    }
    if (gatheringEnd.getTime() <= gatheringStart.getTime()) {
      return NextResponse.json({ error: 'Gathering end must be after start' }, { status: 400 });
    }

    const author = decoded.nickname || decoded.discordId || decoded.role;
    const authorUserId = decoded.id || decoded.discordId || decoded.nickname || null;
    const category = payload.category || 'general';

    const inserted = await pool.query(
      `
      INSERT INTO help_requests (title, details, category, author, author_user_id, status, gathering_start, gathering_end)
      VALUES ($1, $2, $3, $4, $5, 'open', $6, $7)
      RETURNING id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
      `,
      [payload.title, payload.details, category, author, authorUserId, gatheringStart, gatheringEnd]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
        title: row.title,
        details: row.details,
        category: row.category,
        author: row.author,
        authorUserId: row.author_user_id ? String(row.author_user_id) : null,
        status: row.status === 'closed' ? 'closed' : 'open',
        createdAt: (row.created_at || new Date()).toISOString(),
        gatheringStart: (row.gathering_start || new Date()).toISOString(),
        gatheringEnd: (row.gathering_end || new Date()).toISOString(),
        responders: [],
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

    const isOfficer = hasRoleAtLeast(decoded.role, 'officer');

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        { error: 'Database is not configured (missing DATABASE_URL)' },
        { status: 503 }
      );
    }

    const payload = helpUpdateSchema.parse(await request.json());

    await ensureHelpSchema();
    const pool = getPool();

    const wantsStatusUpdate = Boolean(payload.status);
    const wantsTimeUpdate = Boolean(payload.gatheringStart) && Boolean(payload.gatheringEnd);

    if (wantsStatusUpdate && !isOfficer) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let gatheringStart: Date | null = null;
    let gatheringEnd: Date | null = null;
    if (wantsTimeUpdate) {
      gatheringStart = new Date(payload.gatheringStart as string);
      gatheringEnd = new Date(payload.gatheringEnd as string);
      if (!isValidDate(gatheringStart) || !isValidDate(gatheringEnd)) {
        return NextResponse.json({ error: 'Invalid gathering time range' }, { status: 400 });
      }
      if (gatheringEnd.getTime() <= gatheringStart.getTime()) {
        return NextResponse.json({ error: 'Gathering end must be after start' }, { status: 400 });
      }
    }

    if (wantsTimeUpdate && !isOfficer) {
      const userId = decoded.id || decoded.discordId || decoded.nickname || null;
      if (!userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const existing = await pool.query(`SELECT author_user_id, author FROM help_requests WHERE id = $1`, [payload.id]);
      const row = existing.rows[0];
      if (!row) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      const authorUserId = row.author_user_id ? String(row.author_user_id) : null;
      const isAuthor =
        (authorUserId && authorUserId === String(userId)) ||
        (!authorUserId && decoded.nickname && row.author && String(row.author).toLowerCase() === String(decoded.nickname).toLowerCase());

      if (!isAuthor) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const sets: string[] = [];
    const values: any[] = [payload.id];

    if (payload.status) {
      values.push(payload.status);
      sets.push(`status = $${values.length}`);
    }
    if (wantsTimeUpdate) {
      values.push(gatheringStart);
      sets.push(`gathering_start = $${values.length}`);
      values.push(gatheringEnd);
      sets.push(`gathering_end = $${values.length}`);
    }

    const updated = await pool.query(
      `
      UPDATE help_requests
      SET ${sets.join(', ')}
      WHERE id = $1
      RETURNING id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
      `,
      values
    );

    const row = updated.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const responders = await pool.query(
      `
      SELECT responder_user_id, responder_nickname, responder_class, responded_at
      FROM help_request_responders
      WHERE request_id = $1
      ORDER BY responded_at ASC
      `,
      [Number(row.id)]
    );

    const createdAt = (row.created_at || new Date()).toISOString();
    const timeStart = row.gathering_start ? new Date(row.gathering_start).toISOString() : createdAt;
    const timeEnd = row.gathering_end ? new Date(row.gathering_end).toISOString() : timeStart;

    return NextResponse.json({
      id: String(row.id),
      title: row.title || '',
      details: row.details || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      authorUserId: row.author_user_id ? String(row.author_user_id) : null,
      status: row.status === 'closed' ? 'closed' : 'open',
      createdAt,
      gatheringStart: timeStart,
      gatheringEnd: timeEnd,
      responders: responders.rows.map((r) => ({
        userId: String(r.responder_user_id),
        nickname: r.responder_nickname || '',
        className: r.responder_class || '',
        respondedAt: (r.responded_at || new Date()).toISOString(),
      })),
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
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    await ensureHelpSchema();
    const pool = getPool();
    const deleted = await pool.query(`DELETE FROM help_requests WHERE id = $1 RETURNING id`, [id]);
    if (!deleted.rows[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting help request:', error);
    return NextResponse.json({ error: 'Failed to delete help request' }, { status: 500 });
  }
}
