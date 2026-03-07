import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import { hasRoleAtLeast } from '@/lib/authz';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const dynamic = 'force-dynamic';

type RuleInput = {
  text_ru?: unknown;
  text_en?: unknown;
};

async function ensureRulesTable() {
  const pool = getPool();
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

function requireOfficerWrite(request: NextRequest) {
  const token = getTokenFromRequest(request) || request.cookies.get('auth_token')?.value || null;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasRoleAtLeast(decoded.role, 'officer')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}

export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const pool = await ensureRulesTable();
    const result = await pool.query(
      'SELECT id, text_ru, text_en, order_index FROM rules ORDER BY order_index ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = requireOfficerWrite(request);
    if (authError) {
      return authError;
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = (await request.json()) as RuleInput;
    const rule = sanitizeRule(body);

    if (!rule.text_ru && !rule.text_en) {
      return NextResponse.json({ error: 'At least one text field is required' }, { status: 400 });
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
    console.error('Error creating rule:', error);
    return NextResponse.json({ error: 'Failed to create rule' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authError = requireOfficerWrite(request);
    if (authError) {
      return authError;
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = (await request.json()) as { rules?: RuleInput[] };
    const rules = body.rules;

    if (!Array.isArray(rules)) {
      return NextResponse.json({ error: 'Rules array is required' }, { status: 400 });
    }

    const sanitizedRules = rules.map(sanitizeRule).filter((rule) => rule.text_ru || rule.text_en);
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
    console.error('Error updating rules:', error);
    return NextResponse.json({ error: 'Failed to update rules' }, { status: 500 });
  }
}
