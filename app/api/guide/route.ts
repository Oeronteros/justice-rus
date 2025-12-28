import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guideCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  content: z.string().trim().min(1).max(50_000),
  category: z.string().trim().min(1).max(60).optional(),
  author: z.string().trim().min(1).max(60).optional(),
});

function getAuthToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth_token')?.value;
  const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);
  return token || null;
}

async function ensureGuideSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content_md TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      author TEXT NOT NULL DEFAULT 'unknown',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide_comment (
      id SERIAL PRIMARY KEY,
      guide_id INTEGER NOT NULL REFERENCES guide(id) ON DELETE CASCADE,
      author TEXT NOT NULL DEFAULT 'unknown',
      comment TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS guide_vote (
      guide_id INTEGER NOT NULL REFERENCES guide(id) ON DELETE CASCADE,
      voter_key TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (guide_id, voter_key)
    );
  `);

  await pool.query(`CREATE INDEX IF NOT EXISTS guide_updated_at_idx ON guide(updated_at DESC);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS guide_category_idx ON guide(category);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS guide_comment_guide_idx ON guide_comment(guide_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS guide_vote_guide_idx ON guide_vote(guide_id);`);
}

async function seedGuidesIfEmpty() {
  const pool = getPool();
  const count = await pool.query(`SELECT COUNT(*)::int AS c FROM guide;`);
  if ((count.rows[0]?.c || 0) > 0) return;

  await pool.query(
    `
    INSERT INTO guide (title, content_md, category, author)
    VALUES
      ($1, $2, 'general', 'Demonic Cult'),
      ($3, $4, 'pve', 'Demonic Cult'),
      ($5, $6, 'pvp', 'Demonic Cult')
    `,
    [
      'Кодекс ордена: дисциплина и польза',
      [
        '### Суть',
        '- Мы не шумим. Мы делаем.',
        '- Мы держим строй и читаем бой.',
        '- Мы помогаем тем, кто честно тренируется.',
        '',
        '### Как просить помощь',
        '- Напиши класс/роль/уровень.',
        '- Опиши билд и что уже пробовал.',
        '- Приложи цифры урона/ДПС, если есть.',
      ].join('\n'),
      'Подготовка к рейду (коротко и по делу)',
      [
        '### Перед заходом',
        '- Еда/бафы/ремонт.',
        '- Проверка скилл-бара и биндов.',
        '- 2–3 тестовых прокаста на манекене.',
        '',
        '### В бою',
        '- Не геройствуй: контроль важнее цифр.',
        '- Следи за механиками и таймерами.',
      ].join('\n'),
      'Дуэльный холод: контроль вместо суеты',
      [
        '### Принцип',
        'Сначала **контроль**, потом **урон**.',
        '',
        '### Мини-ритуал',
        '- Открой размен безопасно.',
        '- Поймай окно — зафиксируй.',
        '- Дай прокаст — отступи.',
      ].join('\n'),
    ]
  );
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

    await ensureGuideSchema();
    await seedGuidesIfEmpty();

    const pool = getPool();
    const result = await pool.query(`
      SELECT
        g.id,
        g.title,
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
      title: row.title || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      createdAt: (row.created_at || new Date()).toISOString(),
      updatedAt: (row.updated_at || row.created_at || new Date()).toISOString(),
      votes: row.votes || 0,
      commentsCount: row.comments || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading guides:', error);
    return NextResponse.json({ error: 'Failed to load guides' }, { status: 500 });
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

    const payload = guideCreateSchema.parse(await request.json());

    await ensureGuideSchema();
    const pool = getPool();

    const author = payload.author || decoded.discordId || decoded.role;
    const category = payload.category || 'general';

    const inserted = await pool.query(
      `
      INSERT INTO guide (title, content_md, category, author, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, title, category, author, created_at, updated_at
      `,
      [payload.title, payload.content, category, author]
    );

    const row = inserted.rows[0];
    return NextResponse.json(
      {
        id: String(row.id),
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating guide:', error);
    return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
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

