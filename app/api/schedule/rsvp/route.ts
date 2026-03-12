import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { optionsResponse } from '@/lib/server/cors';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import { rsvpStatusSchema, createRsvpSchema, updateRsvpSchema } from '@/lib/schemas/rsvp';

const rsvpCreateSchema = createRsvpSchema.extend({
  userId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || session.value.id;

    if (!hasDatabaseUrl()) {
      // Return mock data for development
      return NextResponse.json([]);
    }

    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, user_id, schedule_id, status, note, created_at, updated_at
      FROM rsvps
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    const rsvps = result.rows.map((row) => ({
      id: String(row.id),
      userId: row.user_id,
      scheduleId: row.schedule_id,
      status: row.status,
      note: row.note,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json(rsvps);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error fetching RSVPs:',
      fallbackMessage: 'Failed to fetch RSVPs',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase('Database is not configured');
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody(request, rsvpCreateSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
    const pool = getPool();

    // Check if RSVP already exists
    const existing = await pool.query(
      'SELECT id FROM rsvps WHERE user_id = $1 AND schedule_id = $2',
      [session.value.id, payload.scheduleId]
    );

    let result;
    if (existing.rows.length > 0) {
      // Update existing
      result = await pool.query(
        `
        UPDATE rsvps
        SET status = $1, note = $2, updated_at = NOW()
        WHERE user_id = $3 AND schedule_id = $4
        RETURNING id, user_id, schedule_id, status, note, created_at, updated_at
        `,
        [payload.status, payload.note || null, session.value.id, payload.scheduleId]
      );
    } else {
      // Create new
      result = await pool.query(
        `
        INSERT INTO rsvps (user_id, schedule_id, status, note, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING id, user_id, schedule_id, status, note, created_at, updated_at
        `,
        [session.value.id, payload.scheduleId, payload.status, payload.note || null]
      );
    }

    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 });
    }

    return NextResponse.json({
      id: String(row.id),
      userId: row.user_id,
      scheduleId: row.schedule_id,
      status: row.status,
      note: row.note,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error saving RSVP:',
      fallbackMessage: 'Failed to save RSVP',
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase('Database is not configured');
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody(request, updateRsvpSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
    const pool = getPool();

    const result = await pool.query(
      `
      UPDATE rsvps
      SET status = $1, note = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING id, user_id, schedule_id, status, note, created_at, updated_at
      `,
      [payload.status, payload.note || null, payload.id, session.value.id]
    );

    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: String(row.id),
      userId: row.user_id,
      scheduleId: row.schedule_id,
      status: row.status,
      note: row.note,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating RSVP:',
      fallbackMessage: 'Failed to update RSVP',
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase('Database is not configured');
    if (!db.ok) {
      return db.response;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const pool = getPool();
    await pool.query('DELETE FROM rsvps WHERE id = $1 AND user_id = $2', [id, session.value.id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error deleting RSVP:',
      fallbackMessage: 'Failed to delete RSVP',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'POST', 'PATCH', 'DELETE'], headers: ['Content-Type', 'X-API-KEY', 'Authorization'] });
}
