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

const voteSchema = z.object({
  voterKey: z.string().trim().min(8).max(120).optional(),
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

    const parsed = await parseJsonBody<z.infer<typeof voteSchema>>(request, voteSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
    const voterKey = decoded.id ? `account:${decoded.id}` : (payload.voterKey || '').trim();
    if (!voterKey) {
      return NextResponse.json({ error: 'Missing voter key' }, { status: 400 });
    }

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
      [guideId, voterKey]
    );

    let voted = false;
    if ((already.rowCount ?? 0) > 0) {
      await pool.query(`DELETE FROM guide_vote WHERE guide_id = $1 AND voter_key = $2`, [guideId, voterKey]);
      voted = false;
    } else {
      await pool.query(`INSERT INTO guide_vote (guide_id, voter_key) VALUES ($1, $2)`, [guideId, voterKey]);
      voted = true;
    }

    const votesRes = await pool.query(`SELECT COUNT(*)::int AS votes FROM guide_vote WHERE guide_id = $1`, [guideId]);
    const votes = votesRes.rows[0]?.votes || 0;

    return NextResponse.json({ votes, voted });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error voting guide:',
      fallbackMessage: 'Failed to vote',
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
