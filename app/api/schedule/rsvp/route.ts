import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { requireSameOrigin } from '@/lib/server/route-helpers';
import { rsvpStatusSchema, createRsvpSchema, updateRsvpSchema } from '@/lib/schemas/rsvp';

const rsvpCreateSchema = createRsvpSchema.extend({
  userId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || decoded.id;

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
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = rsvpCreateSchema.parse(await request.json());
    const pool = getPool();

    // Check if RSVP already exists
    const existing = await pool.query(
      'SELECT id FROM rsvps WHERE user_id = $1 AND schedule_id = $2',
      [decoded.id, payload.scheduleId]
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
        [payload.status, payload.note || null, decoded.id, payload.scheduleId]
      );
    } else {
      // Create new
      result = await pool.query(
        `
        INSERT INTO rsvps (user_id, schedule_id, status, note, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING id, user_id, schedule_id, status, note, created_at, updated_at
        `,
        [decoded.id, payload.scheduleId, payload.status, payload.note || null]
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error saving RSVP:', error);
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = updateRsvpSchema.parse(await request.json());
    const pool = getPool();

    const result = await pool.query(
      `
      UPDATE rsvps
      SET status = $1, note = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING id, user_id, schedule_id, status, note, created_at, updated_at
      `,
      [payload.status, payload.note || null, payload.id, decoded.id]
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating RSVP:', error);
    return NextResponse.json({ error: 'Failed to update RSVP' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const pool = getPool();
    await pool.query('DELETE FROM rsvps WHERE id = $1 AND user_id = $2', [id, decoded.id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    return NextResponse.json({ error: 'Failed to delete RSVP' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
    },
  });
}
