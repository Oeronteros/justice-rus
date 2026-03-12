import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { runServerTaskOnce } from '@/lib/server/db-cache';
import {
  handleRouteError,
  jsonError,
  parseJsonBody,
  requireActiveSession,
  requireDatabase,
  requireMinimumRole,
  requireSameOrigin,
} from '@/lib/server/route-helpers';

type RuleInput = {
  text_ru?: unknown;
  text_en?: unknown;
};

const ruleInputSchema = z.object({
  text_ru: z.string().optional(),
  text_en: z.string().optional(),
});

const rulesBatchSchema = z.object({
  rules: z.array(ruleInputSchema),
});

async function ensureRulesTable() {
  const pool = getPool();
  await runServerTaskOnce('schema:rules', async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        text_ru TEXT NOT NULL DEFAULT '',
        text_en TEXT NOT NULL DEFAULT '',
        order_index INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_rules_order ON rules(order_index);`);
  });
  return pool;
}

function normalizeRuleText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeRule(rule: RuleInput) {
  return {
    text_ru: normalizeRuleText(rule.text_ru),
    text_en: normalizeRuleText(rule.text_en),
  };
}

async function requireOfficerWrite(request: NextRequest) {
  const sameOrigin = requireSameOrigin(request);
  if (!sameOrigin.ok) {
    return sameOrigin;
  }

  const session = await requireActiveSession(request);
  if (!session.ok) {
    return session;
  }

  return requireMinimumRole(session.value, 'officer');
}

export async function GET() {
  try {
    const db = requireDatabase('Database not configured');
    if (!db.ok) {
      return db.response;
    }

    const pool = await ensureRulesTable();
    const result = await pool.query(
      'SELECT id, text_ru, text_en, order_index FROM rules ORDER BY order_index ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error fetching rules:',
      fallbackMessage: 'Failed to fetch rules',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireOfficerWrite(request);
    if (!guard.ok) {
      return guard.response;
    }

    const db = requireDatabase('Database not configured');
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody(request, ruleInputSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const rule = sanitizeRule(parsed.value);

    if (!rule.text_ru && !rule.text_en) {
      return jsonError('At least one text field is required', 400);
    }

    const pool = await ensureRulesTable();
    const maxOrder = await pool.query('SELECT COALESCE(MAX(order_index), 0) as max FROM rules');
    const newOrder = (maxOrder.rows[0]?.max || 0) + 1;

    const result = await pool.query(
      'INSERT INTO rules (text_ru, text_en, order_index) VALUES ($1, $2, $3) RETURNING id, text_ru, text_en, order_index',
      [rule.text_ru, rule.text_en, newOrder]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error creating rule:',
      fallbackMessage: 'Failed to create rule',
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const guard = await requireOfficerWrite(request);
    if (!guard.ok) {
      return guard.response;
    }

    const db = requireDatabase('Database not configured');
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody(request, rulesBatchSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const sanitizedRules = parsed.value.rules.map(sanitizeRule).filter((rule) => rule.text_ru || rule.text_en);
    const pool = await ensureRulesTable();

    await pool.query('DELETE FROM rules');

    for (let i = 0; i < sanitizedRules.length; i++) {
      const rule = sanitizedRules[i];
      await pool.query(
        'INSERT INTO rules (text_ru, text_en, order_index) VALUES ($1, $2, $3)',
        [rule.text_ru, rule.text_en, i + 1]
      );
    }

    const result = await pool.query(
      'SELECT id, text_ru, text_en, order_index FROM rules ORDER BY order_index ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating rules:',
      fallbackMessage: 'Failed to update rules',
    });
  }
}
