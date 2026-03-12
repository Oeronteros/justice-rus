import { NextRequest, NextResponse } from 'next/server';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { requireActiveSession } from '@/lib/server/route-helpers';

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const user = session.value;

    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get('scheduleId');

    if (!scheduleId) {
      return NextResponse.json({ error: 'scheduleId is required' }, { status: 400 });
    }

    if (!hasDatabaseUrl()) {
      // Return mock data
      return NextResponse.json({
        scheduleId,
        going: 0,
        notGoing: 0,
        maybe: 0,
        pending: 0,
        total: 0,
        myStatus: null,
      });
    }

    const pool = getPool();
    
    // Get RSVP counts
    const countsResult = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE status = 'going') as going,
        COUNT(*) FILTER (WHERE status = 'not_going') as not_going,
        COUNT(*) FILTER (WHERE status = 'maybe') as maybe,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) as total
      FROM rsvps
      WHERE schedule_id = $1
      `,
      [scheduleId]
    );

    const counts = countsResult.rows[0];

    // Get current user's status
    let myStatus = null;
    if (user.id) {
      const myResult = await pool.query(
        'SELECT status FROM rsvps WHERE schedule_id = $1 AND user_id = $2',
        [scheduleId, user.id]
      );
      if (myResult.rows.length > 0) {
        myStatus = myResult.rows[0].status;
      }
    }

    return NextResponse.json({
      scheduleId,
      going: Number(counts.going) || 0,
      notGoing: Number(counts.not_going) || 0,
      maybe: Number(counts.maybe) || 0,
      pending: Number(counts.pending) || 0,
      total: Number(counts.total) || 0,
      myStatus,
    });
  } catch (error) {
    console.error('Error fetching RSVP summary:', error);
    return NextResponse.json({ error: 'Failed to fetch RSVP summary' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
    },
  });
}
