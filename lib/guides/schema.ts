import { getPool } from '@/lib/neon';
import { runServerTaskOnce } from '@/lib/server/db-cache';

export async function ensureGuideSchema() {
  await runServerTaskOnce('schema:guide', async () => {
    const pool = getPool();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS guide (
        id SERIAL PRIMARY KEY,
        owner_account_id INTEGER NULL,
        title TEXT NOT NULL,
        content_md TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        author TEXT NOT NULL DEFAULT 'unknown',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await pool.query(`ALTER TABLE guide ADD COLUMN IF NOT EXISTS owner_account_id INTEGER NULL;`);

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
    await pool.query(`CREATE INDEX IF NOT EXISTS guide_owner_account_id_idx ON guide(owner_account_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS guide_comment_guide_idx ON guide_comment(guide_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS guide_vote_guide_idx ON guide_vote(guide_id);`);
  });
}

export async function seedGuidesIfEmpty() {
  await runServerTaskOnce('seed:guide', async () => {
    const pool = getPool();
    const count = await pool.query(`SELECT COUNT(*)::int AS c FROM guide;`);

    if ((count.rows[0]?.c || 0) > 0) return;

    await pool.query(
      `
      INSERT INTO guide (title, content_md, category, author)
      VALUES
        ($1, $2, 'general', 'Silent Moonfall'),
        ($3, $4, 'pve', 'Silent Moonfall'),
        ($5, $6, 'pvp', 'Silent Moonfall')
      `,
      [
        'Кодекс гильдии: дисциплина и командная польза',
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
        'Подготовка к рейду (кратко и по делу)',
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
        'Дуэльный ритм: контроль вместо суеты',
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
  });
}
