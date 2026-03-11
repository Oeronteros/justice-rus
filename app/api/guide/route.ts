import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractWikiReferences, normalizeGuideTitle } from '@/lib/guides/obsidian';
import { ensureGuideSchema, seedGuidesIfEmpty } from '@/lib/guides/schema';
import { getPool } from '@/lib/neon';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';

const guideCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  content: z.string().trim().min(1).max(500_000),
  category: z.string().trim().min(1).max(60).optional(),
  author: z.string().trim().min(1).max(100).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return auth.response;
    }

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    await ensureGuideSchema();
    await seedGuidesIfEmpty();

    const pool = getPool();
    const result = await pool.query(`
      SELECT
        g.id,
        g.title,
        g.content_md,
        g.category,
        g.author,
        g.created_at,
        g.updated_at,
        COALESCE(v.votes, 0)::int AS votes,
        COALESCE(c.comments, 0)::int AS comments
      FROM guide g
      LEFT JOIN (
        SELECT guide_id, COUNT(*) AS votes
        FROM guide_vote
        GROUP BY guide_id
      ) v ON v.guide_id = g.id
      LEFT JOIN (
        SELECT guide_id, COUNT(*) AS comments
        FROM guide_comment
        GROUP BY guide_id
      ) c ON c.guide_id = g.id
      ORDER BY g.updated_at DESC
      LIMIT 200
    `);

    const data = result.rows.map((row) => ({
      id: String(row.id),
      slug: normalizeGuideTitle(row.title || ''),
      title: row.title || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      createdAt: (row.created_at || new Date()).toISOString(),
      updatedAt: (row.updated_at || row.created_at || new Date()).toISOString(),
      votes: row.votes || 0,
      commentsCount: row.comments || 0,
      linkTargets: extractWikiReferences(row.content_md || '').map((reference) => reference.slug),
    }));

    return NextResponse.json(data);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error loading guides:',
      fallbackMessage: 'Failed to load guides',
    });
  }
}

export async function POST(request: NextRequest) {
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

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody<z.infer<typeof guideCreateSchema>>(request, guideCreateSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;

    await ensureGuideSchema();
    const pool = getPool();

    const author = payload.author || decoded.nickname || decoded.discordId || decoded.role;
    const category = payload.category || 'general';

    const ownerAccountId = decoded.id && Number.isFinite(Number(decoded.id)) ? Number(decoded.id) : null;

    const inserted = await pool.query(
      `
      INSERT INTO guide (owner_account_id, title, content_md, category, author, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, owner_account_id, title, category, author, created_at, updated_at
      `,
      [ownerAccountId, payload.title, payload.content, category, author]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
        slug: normalizeGuideTitle(row.title || ''),
        ownerAccountId: row.owner_account_id == null ? null : String(row.owner_account_id),
        title: row.title,
        category: row.category,
        author: row.author,
        createdAt: (row.created_at || new Date()).toISOString(),
        updatedAt: (row.updated_at || row.created_at || new Date()).toISOString(),
        votes: 0,
        commentsCount: 0,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error creating guide:',
      fallbackMessage: 'Failed to create guide',
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
