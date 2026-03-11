import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool } from '@/lib/neon';
import { ensureHelpSchema, resolveRosterClassName } from '../_shared';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
} from '@/lib/server/route-helpers';

const rsvpSchema = z.object({
  id: z.union([z.string(), z.number()]),
});

async function loadHelpRequest(requestId: number) {
  const pool = getPool();

  const requestRow = await pool.query(
    `
    SELECT id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
    FROM help_requests
    WHERE id = $1
    LIMIT 1
    `,
    [requestId]
  );

  const row = requestRow.rows[0];
  if (!row) return null;

  const responders = await pool.query(
    `
    SELECT responder_user_id, responder_nickname, responder_class, responded_at
    FROM help_request_responders
    WHERE request_id = $1
    ORDER BY responded_at ASC
    `,
    [requestId]
  );

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
    responders: responders.rows.map((r) => ({
      userId: String(r.responder_user_id),
      nickname: r.responder_nickname || '',
      className: r.responder_class || '',
      respondedAt: (r.responded_at || new Date()).toISOString(),
    })),
  };
}

export async function POST(request: NextRequest) {
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

    if (!decoded.id) {
      return NextResponse.json({ error: 'Responder identity is unavailable' }, { status: 400 });
    }

    const parsed = await parseJsonBody<z.infer<typeof rsvpSchema>>(request, rsvpSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
    const requestId = Number(payload.id);
    if (!Number.isFinite(requestId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    await ensureHelpSchema();
    const pool = getPool();

    const nickname = decoded.nickname || 'unknown';
    const className = (await resolveRosterClassName(decoded.nickname)) || '';

    await pool.query(
      `
      INSERT INTO help_request_responders (request_id, responder_user_id, responder_nickname, responder_class)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (request_id, responder_user_id)
      DO UPDATE SET responder_nickname = EXCLUDED.responder_nickname, responder_class = EXCLUDED.responder_class
      `,
      [requestId, decoded.id, nickname, className]
    );

    const updated = await loadHelpRequest(requestId);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error RSVP help request:',
      fallbackMessage: 'Failed to RSVP help request',
    });
  }
}

export async function DELETE(request: NextRequest) {
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

    if (!decoded.id) {
      return NextResponse.json({ error: 'Responder identity is unavailable' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const requestId = Number(searchParams.get('id'));
    if (!Number.isFinite(requestId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    await ensureHelpSchema();
    const pool = getPool();
    await pool.query(
      `DELETE FROM help_request_responders WHERE request_id = $1 AND responder_user_id = $2`,
      [requestId, decoded.id]
    );

    const updated = await loadHelpRequest(requestId);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error withdrawing RSVP:',
      fallbackMessage: 'Failed to withdraw RSVP',
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
